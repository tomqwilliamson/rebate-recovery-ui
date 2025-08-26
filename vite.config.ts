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
          // Add security headers
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;");
          res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
          res.setHeader('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()');
          res.setHeader('X-Frame-Options', 'SAMEORIGIN');
          next();
        });
      }
    },
    {
      name: 'logging',
      configureServer(server) {
        server.middlewares.use((req: any, res: any, next: () => void) => {
          console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
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