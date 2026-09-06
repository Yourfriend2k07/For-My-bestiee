import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: '/For-My-bestie/',

    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env.
      // Do not modify watch settings to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable polling when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
