import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      radf: resolve(rootDir, 'src/index.js'),
      xlsx: resolve(rootDir, 'test/mocks/xlsx.js'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
    globals: true,
    css: true,
    exclude: ['tests/**'],
    include: [
      'src/framework/__tests__/**/*.test.{js,jsx}',
      'composer/lazy-dashboards/src/**/__tests__/**/*.test.{js,jsx}',
    ],
  },
});
