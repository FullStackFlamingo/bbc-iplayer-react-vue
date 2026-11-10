import { createClient, cacheExchange, fetchExchange, ssrExchange, Provider, SSRData } from 'urql';
import { requestPolicyExchange } from '@urql/exchange-request-policy';
import { ReactNode } from 'react';

export const createUrqlProvider = function (preloadedUrqlState?: SSRData) {
  const ssrUrql = ssrExchange({ isClient: !import.meta.env.SSR, initialState: preloadedUrqlState });

  const client = createClient({
    suspense: true,
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

  return {
    // eslint-disable-next-line @eslint-react/component-hook-factories
    UrqlProvider: (props: { children: ReactNode }) => {
      return <Provider value={client}>{props.children}</Provider>;
    },
    ssrUrql,
  };
};
