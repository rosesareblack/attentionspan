
import { Component, ChangeDetectionStrategy, signal, inject, ElementRef, viewChild, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';
import { ChatMessage } from '../../models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// A simple, lightweight markdown-to-HTML converter
function simpleMarkdown(text: string): string {
  let html = text
    // Bold **text**
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic *text*
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Unordered list items * item
    .replace(/^\s*\*\s+(.*)/gm, '<li>$1</li>');
  
  // Wrap list items in <ul>
  html = html.replace(/<li>(.*?)<\/li>/gs, (match) => `<ul>${match}</ul>`);
  html = html.replace(/<\/ul>\s*<ul>/g, ''); // Fix consecutive lists

  return html;
}

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex flex-col h-full bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      <div #chatContainer class="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900">
        @if (messages().length <= 1) {
          <div class="text-center p-8">
            <div class="grok-bg rounded-full h-16 w-16 mx-auto mb-4 flex-shrink-0 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-2">How can I help?</h2>
            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mx-auto">
              @for (prompt of suggestedPrompts; track prompt) {
                <button (click)="sendSuggestedPrompt(prompt)" class="p-3 text-sm text-left bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  {{ prompt }}
                </button>
              }
            </div>
          </div>
        }

        @for (message of messages(); track message.id) {
          <div class="flex items-start gap-3 w-full animate-fade-in" [class.justify-end]="message.role === 'user'">
            @if (message.role !== 'user') {
              <div class="grok-bg rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                </svg>
              </div>
            }
            <div class="max-w-xl group relative">
              <div class="p-3 rounded-lg break-words prose prose-sm dark:prose-invert max-w-none"
                   [class.bg-blue-600]="message.role === 'user'"
                   [class.text-white]="message.role === 'user'"
                   [class.bg-slate-100]="message.role !== 'user'"
                   [class.dark:bg-slate-800]="message.role !== 'user'"
                   [class.text-red-500]="message.role === 'error'"
                   [class.dark:text-red-400]="message.role === 'error'">
                <div [innerHTML]="getSafeHtml(message.text)"></div>
              </div>
              @if (message.role === 'model' && message.text) {
                <button (click)="copyMessage(message.text)" class="absolute -top-2 -right-2 p-1 bg-slate-200 dark:bg-slate-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-slate-600 dark:text-slate-300">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                  </svg>
                </button>
              }
            </div>
             @if (message.role === 'user') {
               <div class="bg-slate-200 dark:bg-slate-700 rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center text-slate-500 dark:text-slate-300 font-semibold text-sm">YOU</div>
            }
          </div>
        }
        @if (loading()) {
          <div class="flex items-start gap-3 animate-fade-in">
            <div class="grok-bg rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                </svg>
            </div>
            <div class="max-w-xl p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
              <div class="flex items-center space-x-2">
                <div class="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div class="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div class="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        }
      </div>

      <footer class="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <form (ngSubmit)="sendMessage()" class="flex items-center gap-2">
          <input [formControl]="chatInput"
                 type="text"
                 placeholder="Type your message..."
                 class="flex-1 p-2 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <button type="submit" [disabled]="loading() || chatInput.invalid"
                  class="p-2 rounded-md bg-blue-600 text-white font-semibold disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </footer>
    </div>
  `,
  styles: [`
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fade-in 0.3s ease-out forwards;
    }
    .prose ul { margin-left: 1.25rem; }
    .prose li { margin-top: 0.25em; margin-bottom: 0.25em; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiChatComponent {
  geminiService = inject(GeminiService);
  // FIX: Explicitly type DomSanitizer and make it private to fix type inference issue.
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  messages = signal<ChatMessage[]>([]);
  loading = signal(false);
  chatInput = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  private nextId = 1;
  
  chatContainer = viewChild<ElementRef<HTMLDivElement>>('chatContainer');

  suggestedPrompts = [
    'What are common ADHD coping strategies?',
    'Explain executive dysfunction simply.',
    'How is ADHD diagnosed in adults?',
    'What\'s the difference between stimulants and non-stimulants?'
  ];

  constructor() {
    this.geminiService.startChat();
    afterNextRender(() => {
        this.scrollToBottom();
    });
  }

  sendSuggestedPrompt(prompt: string): void {
    this.chatInput.setValue(prompt);
    this.sendMessage();
  }

  async sendMessage(): Promise<void> {
    if (this.chatInput.invalid || this.loading()) return;
    const userMessageText = this.chatInput.value;

    const userMessage: ChatMessage = { id: this.nextId++, role: 'user', text: userMessageText };
    this.messages.update(m => [...m, userMessage]);
    this.chatInput.reset();
    this.loading.set(true);
    this.scrollToBottom();

    try {
      const modelMessage: ChatMessage = { id: this.nextId++, role: 'model', text: '' };
      this.messages.update(m => [...m, modelMessage]);
      this.scrollToBottom();

      const stream = await this.geminiService.streamChat(userMessageText);
      for await (const chunk of stream) {
        this.messages.update(m => {
          const msg = m.find(msg => msg.id === modelMessage.id);
          if (msg) {
              msg.text += chunk.text;
          }
          return [...m];
        });
        this.scrollToBottom();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      this.messages.update(m => [...m, { id: this.nextId++, role: 'error', text: 'Sorry, I encountered an error.' }]);
    } finally {
      this.loading.set(false);
      this.scrollToBottom();
    }
  }

  copyMessage(text: string): void {
    navigator.clipboard.writeText(text).catch(err => console.error('Failed to copy text: ', err));
  }

  getSafeHtml(text: string): SafeHtml {
    const markdownHtml = simpleMarkdown(text);
    return this.sanitizer.bypassSecurityTrustHtml(markdownHtml);
  }

  private scrollToBottom(): void {
    const container = this.chatContainer()?.nativeElement;
    if (container) {
        setTimeout(() => container.scrollTop = container.scrollHeight, 0);
    }
  }
}
