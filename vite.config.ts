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
      chunkSizeWarningLimit: 600,
      cssCodeSplit: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom') || id.includes('zustand')) {
                return 'vendor-react';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('gsap')) {
                return 'vendor-gsap';
              }
              if (id.includes('motion') || id.includes('lenis')) {
                return 'vendor-animation';
              }
              return 'vendor-misc';
            }
          },
        },
      },
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
