/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'local-api-middleware',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/api/plan-trip' && req.method === 'POST') {
              let bodyStr = '';
              req.on('data', (chunk) => {
                bodyStr += chunk.toString();
              });
              req.on('end', async () => {
                try {
                  const body = bodyStr ? JSON.parse(bodyStr) : {};
                  if (env.GEMINI_API_KEY) {
                    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
                  }

                  const { default: handler } = await server.ssrLoadModule('./api/plan-trip.ts');

                  const mockReq = { ...req, body, method: req.method };
                  const mockRes = {
                    status(code: number) {
                      res.statusCode = code;
                      return this;
                    },
                    json(data: unknown) {
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify(data));
                      return this;
                    },
                  };

                  await handler(mockReq, mockRes);
                } catch (err) {
                  console.error('Dev server error in local /api/plan-trip handler:', err);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({
                    success: false,
                    error: "Sorry, we couldn't generate your itinerary right now. Please try again.",
                  }));
                }
              });
              return;
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/test/**', 'src/**/*.d.ts', 'src/vite-env.d.ts'],
      },
    },
  };
});
