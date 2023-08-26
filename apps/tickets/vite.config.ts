/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/tickets',
  server: {
    port: 4200,
    host: 'localhost',
    proxy: {
      '/tickets': {
        target: 'https://infosys-test.fastaval.dk/',
        changeOrigin: true
      }
    }
  },

  preview: {
    port: 4300,
    host: 'localhost'
  },

  plugins: [vue(), nxViteTsPaths()]

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
});
