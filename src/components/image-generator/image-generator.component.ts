import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-image-generator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="h-full w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <div class="w-full max-w-2xl text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-bold mb-2">AI Image Studio</h1>
        <p class="text-slate-600 dark:text-slate-400">Describe an image and let AI bring it to life.</p>
      </div>
      
      <div class="w-full max-w-2xl flex flex-col items-center">
        <form [formGroup]="imageForm" (ngSubmit)="generateImage()" class="w-full flex flex-col sm:flex-row gap-2 mb-4">
          <input formControlName="prompt"
                type="text"
                placeholder="e.g., A brain with glowing neural pathways..."
                class="flex-1 p-3 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-slate-100 dark:disabled:bg-slate-800/50">
          <button type="submit" [disabled]="loading() || imageForm.invalid"
                  class="px-5 py-3 rounded-md bg-blue-600 text-white font-semibold disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors">
            Generate
          </button>
        </form>

        <div class="text-xs text-slate-500 dark:text-slate-400 mb-6 text-center">
          <span class="font-semibold">Try:</span>
          @for(prompt of examplePrompts; track prompt; let isLast = $last) {
            <button (click)="setPrompt(prompt)" class="hover:underline">{{ prompt }}</button>{{ !isLast ? ', ' : '' }}
          }
        </div>

        <div class="w-full aspect-square bg-white dark:bg-slate-950 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md relative group">
          @if (loading()) {
            <div class="flex flex-col items-center text-slate-500 dark:text-slate-400">
              <svg class="animate-spin h-10 w-10 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p>Generating your image...</p>
            </div>
          } @else if (error()) {
            <div class="text-center text-red-500 p-4">
              <p>Sorry, an error occurred while generating the image.</p>
              <p>{{ error() }}</p>
            </div>
          } @else if (imageUrl()) {
            <img [src]="imageUrl()" alt="Generated image" class="object-cover w-full h-full">
            <button (click)="downloadImage()" class="absolute top-3 right-3 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </button>
          } @else {
            <div class="text-center text-slate-500 dark:text-slate-400 p-4 flex flex-col items-center">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mb-4 text-slate-400 dark:text-slate-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <p>Your generated image will appear here.</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageGeneratorComponent {
  geminiService = inject(GeminiService);
  imageUrl = signal<string | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  imageForm = new FormGroup({
    prompt: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
  });

  examplePrompts = ['Calm focus', 'Abstract thought', 'A creative spark'];

  setPrompt(prompt: string): void {
    this.imageForm.controls.prompt.setValue(prompt);
  }

  async generateImage(): Promise<void> {
    if (this.imageForm.invalid || this.loading()) return;
    
    const currentPrompt = this.imageForm.controls.prompt.value;

    this.loading.set(true);
    this.imageUrl.set(null);
    this.error.set(null);
    this.imageForm.controls.prompt.disable();

    try {
      const resultUrl = await this.geminiService.generateImage(currentPrompt);
      if (resultUrl === 'error') {
          this.error.set('Could not generate image.');
      } else {
          this.imageUrl.set(resultUrl);
      }
    } catch (e: any) {
        this.error.set(e.message || 'An unknown error occurred.');
    } finally {
      this.loading.set(false);
      this.imageForm.controls.prompt.enable();
    }
  }

  downloadImage(): void {
    const url = this.imageUrl();
    if (!url) return;

    const link = document.createElement('a');
    link.href = url;
    link.download = `adhd_clarity_hub_image.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
