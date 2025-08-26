import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'azure-health-check',
      configureServer(server) {
        return () => {
          server.middlewares.use((req: any, res: any, next: () => void) => {
            if (req.url === '/robots933456.txt') {
              res.statusCode = 200;
              res.end('OK');
              return;
            }
            next();
          });
        };
      }
    },
    {
      name: 'security-headers',
      configureServer(server) {
        server.middlewares.use((req: any, res: any, next: () => void) => {
          // Add security headers
          res.setHeader('X-Content-Type-Options', 'nosniff');
          // Add cache control header
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          next();
        });
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@app-types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://localhost:7001',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false
      }
    }
  }
})