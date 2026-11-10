import { defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3210,
    strictPort: true,
    hmr: {
      port: 3211,
      // port: 3211,
    },
    ws: {
      port: 24242,
    },
  },
  base: '/frontend/@private/vue-ui/',
  plugins: [vuePlugin(), svgLoader({ svgo: false })],
  build: {
    manifest: true,
    ssrManifest: true,
    rolldownOptions: {
      input: './src/entry-client.js',
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@private/design-system/vars.scss" as designSystemVars;`,
      },
    },
  },
});
