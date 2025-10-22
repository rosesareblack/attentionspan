import { Component, ChangeDetectionStrategy, signal, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

type BreathingStep = 'ready' | 'inhale' | 'hold1' | 'exhale' | 'hold2';
type AnimationState = 'idle' | 'inhale' | 'hold' | 'exhale';

@Component({
  selector: 'app-mindfulness',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mindfulness.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MindfulnessComponent implements OnDestroy {
  sessionActive = signal(false);
  sessionCompleted = signal(false);
  
  private readonly INHALE_END = 4;
  private readonly HOLD1_END = 8;
  private readonly EXHALE_END = 12;
  private readonly CYCLE_DURATION = 16;

  instruction = signal('Select a duration and press Start.');
  currentStep = signal<BreathingStep>('ready');
  
  animationState = computed<AnimationState>(() => {
    switch(this.currentStep()) {
      case 'inhale': return 'inhale';
      case 'exhale': return 'exhale';
      case 'hold1':
      case 'hold2': return 'hold';
      default: return 'idle';
    }
  });
  
  selectedDuration = signal(1); // in minutes
  timeRemaining = signal(0); // in seconds
  durationPopoverOpen = signal(false);
  
  private timer: any;
  private totalDuration = 0;

  ngOnDestroy(): void {
    this.stopSession(false);
  }

  onPopoverToggle(event: Event): void {
    const popover = event.target as HTMLElement;
    // Check if the popover is in the "open" state using the :popover-open pseudo-class
    if (popover.matches(':popover-open')) {
      this.durationPopoverOpen.set(true);
    } else {
      this.durationPopoverOpen.set(false);
    }
  }

  setDuration(minutes: number): void {
    if (!this.sessionActive()) {
        this.selectedDuration.set(minutes);
        this.instruction.set('Press Start to begin.');
        this.sessionCompleted.set(false);
        // The popover will close automatically, triggering the onPopoverToggle event.
    }
  }

  toggleSession(): void {
      if (this.sessionActive()) {
          this.stopSession(false);
      } else {
          this.startSession();
      }
  }

  private startSession(): void {
    if (this.sessionActive()) return;
    
    this.sessionCompleted.set(false);
    this.totalDuration = this.selectedDuration() * 60;
    this.timeRemaining.set(this.totalDuration);
    this.sessionActive.set(true);

    this.updateCycle(0);

    this.timer = setInterval(() => {
      const remaining = this.timeRemaining() - 1;
      this.timeRemaining.set(remaining);

      if (remaining < 0) {
        this.stopSession(true);
        return;
      }
      
      const elapsed = this.totalDuration - remaining;
      this.updateCycle(elapsed);
    }, 1000);
  }

  private stopSession(completed: boolean): void {
    if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
    }
    this.sessionActive.set(false);
    this.currentStep.set('ready');
    
    if (completed) {
        this.instruction.set('Session complete! Well done.');
        this.sessionCompleted.set(true);
    } else {
        this.instruction.set('Session stopped. Select a duration to go again.');
    }
  }

  private updateCycle(elapsedSeconds: number): void {
    const cycleSecond = elapsedSeconds % this.CYCLE_DURATION;
    
    if (cycleSecond < this.INHALE_END) {
        this.instruction.set('Breathe in...');
        this.currentStep.set('inhale');
    } else if (cycleSecond < this.HOLD1_END) {
        this.instruction.set('Hold');
        this.currentStep.set('hold1');
    } else if (cycleSecond < this.EXHALE_END) {
        this.instruction.set('Breathe out...');
        this.currentStep.set('exhale');
    } else {
        this.instruction.set('Hold');
        this.currentStep.set('hold2');
    }
  }

  formatTime(seconds: number): string {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}