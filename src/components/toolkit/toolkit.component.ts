import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

type ToolkitTab = 'framework' | 'arguments' | 'comorbidity' | 'precedents' | 'recommendations';

interface Tab {
  id: ToolkitTab;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-toolkit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolkit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolkitComponent {
  activeTab = signal<ToolkitTab>('framework');

  tabs: Tab[] = [
    { id: 'framework', title: 'Framework', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 12h6m-6 5.25h6M5.25 6h.008v.008H5.25V6Zm.75 0h.008v.008H6V6Zm.75 0h.008v.008H6.75V6Zm.75 0h.008v.008H7.5V6Zm.75 0h.008v.008H8.25V6Zm5.25 0h.008v.008H13.5V6Zm.75 0h.008v.008H14.25V6Zm.75 0h.008v.008H15V6Zm.75 0h.008v.008H15.75V6Zm.75 0h.008v.008H16.5V6Zm-9 5.25h.008v.008H7.5v-.008Zm.75 0h.008v.008H8.25v-.008Zm5.25 0h.008v.008H13.5v-.008Zm.75 0h.008v.008H14.25v-.008Zm-6 5.25h.008v.008H8.25v-.008Zm.75 0h.008v.008H9v-.008Z" />`},
    { id: 'arguments', title: 'Arguments', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5h-6a6 6 0 0 1 6-6v1.5m0-15.75a6 6 0 0 0-6 6v1.5m6-7.5h6a6 6 0 0 1-6 6v-1.5m0 0v-1.5m0-6a6 6 0 0 0-6 6v1.5m6-7.5v1.5" />` },
    { id: 'comorbidity', title: 'Co-morbidity', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />` },
    { id: 'precedents', title: 'Precedents', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />` },
    { id: 'recommendations', title: 'Recommendations', icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.354a15.054 15.054 0 0 1-4.5 0M3 13.5a9 9 0 0 1 18 0a9.02 9.02 0 0 1-9 8.25c-5 0-9-3.75-9-8.25Z" />` }
  ];

  selectTab(tabId: ToolkitTab): void {
    this.activeTab.set(tabId);
  }
}