import { defineConfig } from 'vite';
import { default as angular } from '@angular/build';

export default defineConfig({
  plugins: [angular()],
});