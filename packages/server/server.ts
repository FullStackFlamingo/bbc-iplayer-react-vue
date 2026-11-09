import path from 'node:path';
import fastifyView from '@fastify/view';
import Fastify from 'fastify';
import mercurius from 'mercurius';
import Nunjucks from 'nunjucks';
import { homepage } from './routes/homepage.js';

import { isProd } from './config.js';
import { resolvers, schema } from './graphql/index.js';
import * as ssrAdapter from './plugins/ssr-adapter/index.js';

async function init() {
  const fastify = Fastify({ logger: { level: 'warn' } });

  fastify.register(fastifyView, {
    engine: { nunjucks: Nunjucks },
    root: path.resolve(import.meta.dirname, './templates/'),
  });

  const serverEntryPathReactUI = isProd ? 'dist/server/entry-server.js' : 'src/entry-server.tsx';
  fastify.register(ssrAdapter.plugin, {
    ssrOptions: {
      isProd,
      moduleName: '@private/react-ui',
      serverEntryPath: serverEntryPathReactUI,
    },
  });
  const serverEntryPathVueUI = isProd ? 'dist/server/entry-server.js' : 'src/entry-server.js';
  fastify.register(ssrAdapter.plugin, {
    ssrOptions: {
      isProd,
      moduleName: '@private/vue-ui',
      serverEntryPath: serverEntryPathVueUI,
    },
  });

  fastify.register(homepage);

  Nunjucks.configure(path.resolve(import.meta.dirname, 'templates'), {
    autoescape: true,
    noCache: !isProd,
  });

  fastify.register(mercurius, { schema, resolvers, graphiql: true });

  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log('info', { msg: 'Server running on %s', uri: fastify.listeningOrigin });
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
