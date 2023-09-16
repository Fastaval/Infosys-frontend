/// <reference types="vitest" />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/tickets',
  server: {
    port: 4200,
    host: 'localhost'
  },

  preview: {
    port: 4300,
    host: 'localhost'
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'css/tickets/[name]-[hash][extname]',
        chunkFileNames: 'js/tickets/[name]-[hash].js',
        entryFileNames: `js/tickets/[name]-[hash].js`
      }
    }
  },
  plugins: [vue(), nxViteTsPaths()]
});
