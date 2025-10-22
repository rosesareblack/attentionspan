
import { Component, ChangeDetectionStrategy, signal, computed, WritableSignal, effect, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymptomQuestion } from '../../models';

@Component({
  selector: 'app-symptom-checker',
  templateUrl: './symptom-checker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class SymptomCheckerComponent {
  // New output event to communicate with the parent component
  navigateTo = output<string>();

  questions = signal<SymptomQuestion[]>(this.getInitialQuestions());
  currentQuestionIndex = signal(0);
  quizCompleted = signal(false);

  currentQuestion = computed(() => {
    return this.questions()[this.currentQuestionIndex()];
  });

  progress = computed(() => {
    return ((this.currentQuestionIndex() + 1) / this.questions().length) * 100;
  });

  score = computed(() => {
    if (!this.quizCompleted()) return 0;
    const scoreMap: { [key: string]: number } = {
      'Never': 0,
      'Rarely': 1,
      'Sometimes': 2,
      'Often': 3,
      'Very Often': 4
    };
    return this.questions().reduce((total, q) => total + scoreMap[q.selection() || 'Never'], 0);
  });
  
  resultCategory = computed(() => {
    const s = this.score();
    if (s < 15) return 'Low';
    if (s < 30) return 'Moderate';
    return 'High';
  });

  resultDetails = computed(() => {
    const category = this.resultCategory();
    switch(category) {
      case 'Low':
        return {
          title: "Low Likelihood of ADHD Symptoms",
          description: "Your responses suggest a low likelihood of significant ADHD symptoms based on this screening. Keep in mind, this is not a diagnostic tool."
        };
      case 'Moderate':
        return {
          title: "Moderate Likelihood of ADHD Symptoms",
          description: "Your responses indicate some patterns consistent with ADHD symptoms. It may be beneficial to learn more or speak with a healthcare professional."
        };
      case 'High':
        return {
          title: "High Likelihood of ADHD Symptoms",
          description: "Your responses suggest a pattern of challenges that are often associated with ADHD. Consulting a healthcare professional for a comprehensive evaluation is recommended."
        };
      default:
        return { title: '', description: '' };
    }
  });

  private getInitialQuestions(): SymptomQuestion[] {
    const createQuestion = (id: number, text: string): SymptomQuestion => ({
      id,
      text,
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'],
      selection: signal(null),
    });

    return [
      createQuestion(1, 'How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?'),
      createQuestion(2, 'How often do you have difficulty getting things in order when you have to do a task that requires organization?'),
      createQuestion(3, 'How often do you have problems remembering appointments or obligations?'),
      createQuestion(4, 'When you have a task that requires a lot of thought, how often do you avoid or delay getting started?'),
      createQuestion(5, 'How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?'),
      createQuestion(6, 'How often do you feel overly active and compelled to do things, like you were driven by a motor?'),
      createQuestion(7, 'How often do you make careless mistakes when you have to work on a boring or difficult project?'),
      createQuestion(8, 'How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?'),
      createQuestion(9, 'How often do you misplace or have difficulty finding things at home or at work?'),
      createQuestion(10, 'How often are you distracted by activity or noise around you?'),
    ];
  }

  selectOption(option: string): void {
    this.currentQuestion().selection.set(option);
    setTimeout(() => this.nextQuestion(), 300);
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex() < this.questions().length - 1) {
      this.currentQuestionIndex.update(i => i + 1);
    } else {
      this.quizCompleted.set(true);
    }
  }

  resetQuiz(): void {
    this.questions.set(this.getInitialQuestions());
    this.currentQuestionIndex.set(0);
    this.quizCompleted.set(false);
  }

  onNavigate(view: string): void {
    this.navigateTo.emit(view);
  }
}
