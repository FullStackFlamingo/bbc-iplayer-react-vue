import { createSSRApp, defineAsyncComponent } from 'vue';
import { createPinia } from 'pinia';
import urql, { cacheExchange, fetchExchange, ssrExchange } from '@urql/vue';
import { requestPolicyExchange } from '@urql/exchange-request-policy';
import i18next from 'i18next';
import I18NextVue from 'i18next-vue';
import App from './App.vue';
import { createRouter } from './router';

import '@private/design-system/index.css';

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export async function createApp({ preloadedUrqlState } = {}) {
  const app = createSSRApp(App);
  const router = createRouter();
  const pinia = createPinia();

  /* URQL */
  const ssrUrql = ssrExchange({ isClient: !import.meta.env.SSR, initialState: preloadedUrqlState });
  app.use(urql, {
    url: import.meta.env.SSR ? 'http://localhost:3000/graphql' : '/graphql',
    exchanges: [
      requestPolicyExchange({
        ttl: 60 * 1000 * 2, // 2 mins
      }),
      cacheExchange,
      ssrUrql,
      fetchExchange,
    ],
  });

  /* i18NEXT */
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({ lng: 'en' });
  app.use(I18NextVue, { i18next: i18nextInstance });

  app.use(router).use(pinia);

  const modules = import.meta.glob('./components-global/*.vue');
  for (const path in modules) {
    const name = path.split('/').pop().replace('.vue', '');
    app.component(
      name,
      defineAsyncComponent(() => modules[path]())
    );
  }

  return { app, router, pinia, ssrUrql };
}
