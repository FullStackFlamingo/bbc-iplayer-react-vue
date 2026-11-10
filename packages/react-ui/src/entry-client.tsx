import React from 'react';
import * as Bourne from '@hapi/bourne';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from './store';
import { createUrqlProvider } from './urql-provider';
import App from './App';
import { GLOBAL_PROP_STATE, GLOBAL_PROP_URQL_STATE } from './constants';
import { initi18n } from './i18n';

const init = async () => {
  const preloadedState = Bourne.parse(window[GLOBAL_PROP_STATE] ?? {});
  const preloadedUrqlState = Bourne.parse(window[GLOBAL_PROP_URQL_STATE] ?? {});

  const store = createStore(preloadedState);
  const { UrqlProvider } = createUrqlProvider(preloadedUrqlState);

  await initi18n();

  // eslint-disable-next-line @eslint-react/component-hook-factories
  const AppWrapper = () => (
    <React.StrictMode>
      <Provider store={store} serverState={preloadedState}>
        <UrqlProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UrqlProvider>
      </Provider>
    </React.StrictMode>
  );

  const container = document.getElementById('react-ui');

  if (import.meta.hot) {
    const root = createRoot(container!);
    root.render(<AppWrapper />);
  } else {
    hydrateRoot(container!, <AppWrapper />);
  }
};

init();
