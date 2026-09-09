import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'gokwik-logo-override',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url && req.url.includes('/components/merchants/')) {
              try {
                const targetPath = req.url.replace(/^\/gkx-proxy/, '');
                const targetUrl = 'https://gkx.gokwik.co' + targetPath;
                const response = await fetch(targetUrl, {
                  headers: {
                    'Origin': 'https://imrmuj-v6.myshopify.com',
                    'Referer': 'https://imrmuj-v6.myshopify.com/'
                  }
                });
                const data = await response.json();
                let str = JSON.stringify(data);
                const altoobaLogo = 'https://cdn.jsdelivr.net/gh/altoobafoods2026/altoobafoods@main/src/assets/logo.png';
                str = str
                  .replace(/https:\/\/assets\.gokwik\.co\/uploads\/[0-9]+_Default%20merchant%20logo\.png/g, altoobaLogo)
                  .replace(/https:\/\/assets\.gokwik\.co\/uploads\/[0-9]+_Default merchant logo\.png/g, altoobaLogo);

                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(str);
                return;
              } catch (err) {
                console.error('[GoKwik Logo Override Error]', err);
              }
            }
            next();
          });
        }
      }
    ],
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
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom') || id.includes('zustand') || id.includes('scheduler') || id.includes('@remix-run/router')) {
                return 'vendor-react';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('motion') || id.includes('lenis')) {
                return 'vendor-animation';
              }
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
        },
        '/gkx-proxy': {
          target: 'https://gkx.gokwik.co',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/gkx-proxy/, ''),
          headers: {
            Origin: 'https://imrmuj-v6.myshopify.com',
            Referer: 'https://imrmuj-v6.myshopify.com/'
          },
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Origin', 'https://imrmuj-v6.myshopify.com');
              proxyReq.setHeader('Referer', 'https://imrmuj-v6.myshopify.com/');
            });
          }
        }
      }
    },
  };
});
