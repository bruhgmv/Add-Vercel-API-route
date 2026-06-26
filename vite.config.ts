import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import analyzeHandler from './api/analyze';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'vercel-emulator',
        configureServer(server) {
          server.middlewares.use((req: any, res: any, next) => {
            if (req.url === '/api/analyze' && req.method === 'POST') {
              let body = '';
              req.on('data', (chunk: any) => {
                body += chunk;
              });
              req.on('end', async () => {
                try {
                  req.body = body ? JSON.parse(body) : {};
                } catch (e) {
                  req.body = {};
                }

                // Inject Vercel Serverless helper functions for compatibility
                res.status = (statusCode: number) => {
                  res.statusCode = statusCode;
                  return res;
                };
                res.json = (data: any) => {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                  return res;
                };

                try {
                  await analyzeHandler(req, res);
                } catch (err: any) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: err.message || 'Internal Server Error' }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
