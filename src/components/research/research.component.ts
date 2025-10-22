import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ResearchDocument, ResearchFile, ResearchFolder } from '../../models';
import { DATA } from './research.data';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex h-full bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      <!-- Sidebar -->
      <aside class="w-1/3 md:w-1/4 lg:w-1/5 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div class="p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 class="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">Library</h2>
          <div class="relative">
            <input [formControl]="searchControl" type="text" placeholder="Search..." class="w-full pl-8 pr-2 py-1.5 text-sm rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <svg class="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        </div>
        <nav class="overflow-y-auto flex-1 p-2">
          <ul>
            @for (doc of filteredDocuments(); track doc.id) {
              <li>
                @if (doc.type === 'folder') {
                  <div (click)="toggleFolder(doc)" class="cursor-pointer flex items-center justify-between p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-slate-500 dark:text-slate-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 4.5 3.75h15A2.25 2.25 0 0 1 21.75 6v3.776" />
                      </svg>
                      <span class="font-medium text-slate-700 dark:text-slate-300">{{ doc.title }}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 transition-transform text-slate-400" [class.rotate-90]="doc.isOpen()">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                  @if (doc.isOpen()) {
                    <ul class="pl-4 border-l border-slate-200 dark:border-slate-700 ml-2.5">
                      @for (child of doc.children; track child.id) {
                        <li (click)="selectDocument(child)" 
                            [class.bg-blue-50]="selectedDocument()?.id === child.id"
                            [class.dark:bg-blue-500/10]="selectedDocument()?.id === child.id"
                            class="flex items-center gap-2 p-2 my-1 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-sm">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 flex-shrink-0 text-slate-500 dark:text-slate-400">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                           </svg>
                          <span [class.text-blue-600]="selectedDocument()?.id === child.id" [class.dark:text-blue-400]="selectedDocument()?.id === child.id"
                                [class.font-semibold]="selectedDocument()?.id === child.id">{{ child.title }}</span>
                        </li>
                      }
                    </ul>
                  }
                }
              </li>
            }
             @if(filteredDocuments().length === 0) {
              <p class="p-4 text-sm text-slate-500 text-center">No documents found.</p>
            }
          </ul>
        </nav>
      </aside>

      <!-- Main Content -->
       <main class="w-2/3 md:w-3/4 lg:w-4/5 flex flex-col bg-slate-50 dark:bg-slate-900">
        @if (selectedDocument(); as doc) {
          @if (doc.type === 'file') {
            <div class="p-6 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
              <div class="flex items-start justify-between gap-4">
                <h2 class="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">{{ doc.title }}</h2>
                <button (click)="downloadSelectedDocument()" class="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span>Download</span>
                </button>
              </div>
            </div>
            <div class="overflow-y-auto p-6">
              <article class="prose prose-slate dark:prose-invert max-w-none" [innerHTML]="doc.content"></article>
            </div>
          }
        } @else {
          <div class="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400 p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 mb-4 text-slate-400 dark:text-slate-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m-1.5 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            <p>Select a document to read from the library.</p>
          </div>
        }
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResearchComponent {
  documents = signal<ResearchFolder[]>(DATA);
  selectedDocument = signal<ResearchFile | null>(null);
  searchControl = new FormControl('', { nonNullable: true });
  
  filteredDocuments = computed(() => {
    const searchTerm = this.searchControl.value.toLowerCase();
    if (!searchTerm) {
      return this.documents();
    }
    
    const filtered: ResearchFolder[] = [];
    for (const folder of this.documents()) {
      const matchingChildren = folder.children.filter(child => 
        child.title.toLowerCase().includes(searchTerm)
      );
      
      if (matchingChildren.length > 0) {
        // Create a new folder object to avoid mutating the original
        filtered.push({
          ...folder,
          isOpen: signal(true), // Always open folders when searching
          children: matchingChildren
        });
      }
    }
    return filtered;
  });

  constructor() {
    this.selectDefaultDocument();
  }

  private selectDefaultDocument(): void {
    const firstFolder = this.documents()[0];
    if (firstFolder?.type === 'folder' && firstFolder.children.length > 0) {
      const firstFile = firstFolder.children[0];
      if (firstFile.type === 'file') {
        this.selectDocument(firstFile);
        if (firstFolder.isOpen) {
            firstFolder.isOpen.set(true);
        }
      }
    }
  }

  toggleFolder(folder: ResearchFolder): void {
    folder.isOpen.update(open => !open);
  }

  selectDocument(doc: ResearchDocument): void {
    if (doc.type === 'file') {
      this.selectedDocument.set(doc);
    }
  }

  downloadSelectedDocument(): void {
    const doc = this.selectedDocument();
    if (!doc || doc.type !== 'file') return;

    const tempEl = document.createElement('div');
    tempEl.innerHTML = doc.content;
    const plainText = `# ${doc.title}\n\n${tempEl.textContent || tempEl.innerText || ''}`;
    const blob = new Blob([plainText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    const filename = `${doc.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
