import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { inject } from '@angular/core';

import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { SymptomCheckerComponent } from './components/symptom-checker/symptom-checker.component';
import { AiChatComponent } from './components/ai-chat/ai-chat.component';
import { ResearchComponent } from './components/research/research.component';
import { ImageGeneratorComponent } from './components/image-generator/image-generator.component';
import { MindfulnessComponent } from './components/mindfulness/mindfulness.component';
import { ToolkitComponent } from './components/toolkit/toolkit.component';

type View = 'home' | 'checker' | 'chat' | 'research' | 'image' | 'mindfulness' | 'toolkit';

interface NavItem {
  id: View;
  label: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ThemeToggleComponent,
    SymptomCheckerComponent,
    AiChatComponent,
    ResearchComponent,
    ImageGeneratorComponent,
    MindfulnessComponent,
    ToolkitComponent
  ],
  template: `
    <div class="flex h-screen w-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden">
      <!-- Sidebar Navigation -->
      <nav class="w-16 md:w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300">
        <div class="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 h-16 flex-shrink-0">
            <svg class="w-8 h-8 text-blue-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V8.25a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 8.25v7.5A2.25 2.25 0 0 0 6.75 18Z" />
            </svg>
            <h1 class="text-xl font-bold hidden md:block">Clarity Hub</h1>
        </div>

        <ul class="flex-1 p-2 space-y-1 overflow-y-auto">
          @for(item of navItems; track item.id) {
            <li (click)="currentView.set(item.id)" 
                class="flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors relative group"
                [class.bg-blue-50]="currentView() === item.id"
                [class.dark:bg-blue-500/10]="currentView() === item.id"
                [class.font-semibold]="currentView() === item.id"
                [class.text-blue-600]="currentView() === item.id"
                [class.dark:text-blue-400]="currentView() === item.id"
                [class.hover:bg-slate-100]="currentView() !== item.id"
                [class.dark:hover:bg-slate-800]="currentView() !== item.id"
                >
              <svg class="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" [innerHTML]="getSafeIcon(item.icon)"></svg>
              <span class="hidden md:inline">{{ item.label }}</span>
              <div class="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 md:hidden transition-opacity whitespace-nowrap z-10">
                {{ item.label }}
              </div>
            </li>
          }
        </ul>
        
        <div class="p-4 mt-auto border-t border-slate-200 dark:border-slate-800 flex justify-between items-center h-16 flex-shrink-0">
            <span class="text-sm hidden md:inline">Theme</span>
            <app-theme-toggle></app-theme-toggle>
        </div>
      </nav>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col h-screen">
        <header class="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 h-16 flex-shrink-0 flex items-center px-6">
          <h2 class="text-xl font-semibold">{{ currentViewTitle() }}</h2>
        </header>

        <main class="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900">
          @switch (currentView()) {
            @case ('home') {
              <div class="p-6 sm:p-10">
                  <h1 class="text-3xl md:text-4xl font-bold mb-2 text-slate-800 dark:text-slate-100">Welcome to ADHD Clarity Hub</h1>
                  <p class="text-slate-600 dark:text-slate-400 mb-8">Your toolkit for understanding and managing ADHD.</p>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      @for(item of navItems; track item.id) {
                          @if(item.id !== 'home') {
                              <div (click)="currentView.set(item.id)" class="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all group">
                                  <div class="flex items-center gap-4">
                                      <div class="bg-blue-100 dark:bg-blue-500/10 p-3 rounded-full group-hover:scale-110 transition-transform">
                                          <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" [innerHTML]="getSafeIcon(item.icon)"></svg>
                                      </div>
                                      <div>
                                          <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100">{{ item.label }}</h2>
                                          <p class="text-sm text-slate-500 dark:text-slate-400">{{ item.description }}</p>
                                      </div>
                                  </div>
                              </div>
                          }
                      }
                      <!-- Fact of the day card -->
                       <div class="md:col-span-2 lg:col-span-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-6 flex flex-col">
                          <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">Fact of the Day</h3>
                          <div class="flex-1 flex flex-col justify-center">
                            <p class="text-slate-600 dark:text-slate-400 italic">"{{ factOfTheDay() }}"</p>
                          </div>
                       </div>
                  </div>
              </div>
            }
            @case ('checker') { <app-symptom-checker class="block h-full w-full" (navigateTo)="currentView.set($event)"></app-symptom-checker> }
            @case ('chat') { <app-ai-chat class="block h-full w-full"></app-ai-chat> }
            @case ('research') { <app-research class="block h-full w-full"></app-research> }
            @case ('toolkit') { <app-toolkit class="block h-full w-full"></app-toolkit> }
            @case ('image') { <app-image-generator class="block h-full w-full"></app-image-generator> }
            @case ('mindfulness') { <app-mindfulness class="block h-full w-full"></app-mindfulness> }
          }
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
    }
    .grok-bg {
        background: linear-gradient(45deg, #4285f4, #9b72cb);
    }
  `],
  // FIX: Correct typo from Change-DetectionStrategy to ChangeDetectionStrategy
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  currentView = signal<View>('home');
  
  navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />`, description: 'Dashboard & quick actions.' },
    { id: 'checker', label: 'Symptom Checker', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />`, description: 'Assess your symptoms with a guided quiz.' },
    { id: 'chat', label: 'AI Assistant', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m3.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />`, description: 'Ask questions and get answers from an AI.' },
    { id: 'research', label: 'Research Library', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.05 0 4.01-.683 5.5-1.921l.5-.375 5.5 1.921V4.262c-.938-.332-1.948-.512-3-.512h-1.5a1.5 1.5 0 0 0-1.5 1.5v1.5m-6.75-6.375a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />`, description: 'Browse curated documents and studies.' },
    { id: 'toolkit', label: 'Clinician\'s Toolkit', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10.5 11.25h3M12 15h.008m-7.008 0h14.016m-5.841-3.75h.01M10.5 15h.008m2.992 0h.008m2.992 0h.008M5.25 7.5h13.5m-16.5 0a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25m-16.5 0v-1.125c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v1.125" />`, description: 'Strategies for navigating appeals.' },
    { id: 'image', label: 'Image Studio', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />`, description: 'Create visuals with the power of AI.' },
    { id: 'mindfulness', label: 'Mindfulness', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />`, description: 'Practice guided breathing exercises.' }
  ];

  private readonly adhdFacts = [
    "ADHD is not just a childhood disorder; it's estimated that about 60% of children with ADHD will continue to have symptoms as adults.",
    "The hyperactivity in ADHD often lessens with age and can manifest as internal restlessness in adults.",
    "People with ADHD can experience 'hyperfocus'—an intense concentration on a particular task or topic they find interesting, sometimes for hours.",
    "ADHD is not caused by poor parenting or a lack of willpower. It's a neurodevelopmental disorder with strong genetic and biological links.",
    "Emotional dysregulation, including sharp mood swings and low frustration tolerance, is a common but often overlooked symptom of ADHD.",
    "Studies show differences in brain structure and the functioning of neurotransmitters like dopamine in individuals with ADHD.",
    "ADHD affects executive functions, which are the brain's self-management skills, including working memory, planning, and self-control."
  ];

  factOfTheDay = signal<string>('');

  currentViewTitle = computed(() => {
    return this.navItems.find(item => item.id === this.currentView())?.label || 'ADHD Clarity Hub';
  });

  constructor() {
    this.factOfTheDay.set(this.getDailyFact());
  }

  getSafeIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }

  private getDailyFact(): string {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const factIndex = dayOfYear % this.adhdFacts.length;
    return this.adhdFacts[factIndex];
  }
}