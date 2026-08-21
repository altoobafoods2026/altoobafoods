import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
    },
    server: {
      host: true,
      proxy: {
        '/judgeme-api': {
          target: 'https://judge.me/api/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/judgeme-api/, '')
        }
      }
    },
  };
});
