import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3200,
    strictPort: true,
    hmr: {
      port: 3201,
    },
    ws: {
      port: 24241,
    },
  },
  base: '/frontend/@private/react-ui/',
  plugins: [react()],
  build: {
    manifest: true,
    ssrManifest: true,
    rolldownOptions: {
      input: './src/entry-client.tsx',
    },
  },
});
