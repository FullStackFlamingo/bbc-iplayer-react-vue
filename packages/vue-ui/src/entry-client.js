import { createApp } from './main';
import * as Bourne from '@hapi/bourne';
import { GLOBAL_PROP_STATE, GLOBAL_PROP_URQL_STATE } from './constants';

const preloadedState = Bourne.parse(window[GLOBAL_PROP_STATE] ?? {});
const preloadedUrqlState = Bourne.parse(window[GLOBAL_PROP_URQL_STATE] ?? {});

const init = async () => {
  const { app, router, pinia } = await createApp({ preloadedUrqlState });
  pinia.state.value = preloadedState;
  // wait until router is ready before mounting to ensure hydration match
  router.isReady().then(() => {
    app.mount('#vue-ui');
  });
};

init();
