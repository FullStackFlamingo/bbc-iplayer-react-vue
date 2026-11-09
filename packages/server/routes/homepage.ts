import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify';
import { FromSchema, JSONSchema } from 'json-schema-to-ts';
import Nunjucks from 'nunjucks';
import { isProd } from '../config.js';
import { SSRAdapterData } from '../plugins/ssr-adapter/index.js';

const app = { type: 'string' } as const satisfies JSONSchema;
type ValidFastifyRequest = FastifyRequest<{
  Querystring: { app: FromSchema<typeof app> };
}>;

/**
 * homepage route - plugin installation
 * @param fastify
 * @param options
 * @param done
 */
export function homepage(fastify: FastifyInstance, options: FastifyPluginOptions, done: () => void) {
  fastify.route({
    url: '/*',
    method: 'get',
    schema: { querystring: { type: 'object', properties: { app } } },
    async handler(request: ValidFastifyRequest, reply: FastifyReply) {
      const url = request.url;
      const { app } = request.query;
      try {
        if (app === 'vue-ui') {
          // TODO: different server context?
          const ssrAdapterData = request.server.getDecorator<SSRAdapterData>('ssrAdapterData')?.get('@private/vue-ui');
          const { appHtml: htmlVueUI, headHtml: headHtmlVueUI } = (await ssrAdapterData?.render?.(url)) || {};
          const manifestEntryVueUI = ssrAdapterData?.manifestEntry;
          const htmlOut = await Nunjucks.render('skeleton.njk', {
            app,
            isProd,
            htmlVueUI,
            headHtmlVueUI,
            manifestEntryVueUI,
          });
          return reply.type('text/html').send(htmlOut);
        }

        const ssrAdapterData = request.server.getDecorator<SSRAdapterData>('ssrAdapterData')?.get('@private/react-ui');
        const { appHtml: htmlReactUI, headHtml: headHtmlReactUI } = (await ssrAdapterData?.render?.(url)) || {};
        const manifestEntryReactUI = ssrAdapterData?.manifestEntry;

        const htmlOut = await Nunjucks.render('skeleton.njk', {
          app,
          isProd,
          htmlReactUI,
          headHtmlReactUI,
          manifestEntryReactUI,
        });
        return reply.type('text/html').send(htmlOut);
      } catch (err) {
        if (err instanceof Error) {
          console.error({ err, msg: err.message });
          throw err;
        }
      }
      reply.send();
    },
  });
  done();
}
