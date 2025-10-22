// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  server: {
    port: 5000,
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      strictPort: false,
      host: '0.0.0.0',
      hmr: {
        protocol: 'wss',
        clientPort: 443
      }
    }
  }
});
