import { defineConfig } from 'vite';
import baseConfig from './vite.config';

// https://vitejs.dev/config/
export default defineConfig({
  ...baseConfig,
  build: {
    ssr: true,
    rolldownOptions: {
      input: './src/entry-server.tsx',
      output: {
        entryFileNames: '[name].js',
      },
    },
    outDir: './dist/server',
  },
});
