import path from 'node:path';
import url from 'node:url';
import * as vite from 'vite';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import staticPlugin from '@fastify/static';
import httpProxyPlugin from '@fastify/http-proxy';

type RenderFunction = (url: string, ssrManifest?: vite.Manifest) => Promise<{ appHtml: string; headHtml: string }>;

type SSRAdapterOptions = {
  moduleName: string;
  serverEntryPath: string;
  isProd: boolean;
  assetsPath?: string;
  clientManifestPath?: string;
  ssrManifestPath?: string;
};
export type SSRAdapterData = Map<
  string,
  {
    manifestEntry?: vite.ManifestChunk;
    render: RenderFunction;
  }
>;

/**
 * Setup SSR rendering, and asset serving for a Vite SSR app.
 *
 * using `fastify-plugin` to set global server scope, as we are using `fastify.decorate` in a global way
 */
export const plugin = fp(
  async (fastify: FastifyInstance, options: { prefix?: string; ssrOptions: SSRAdapterOptions }) => {
    const {
      moduleName,
      assetsPath = 'dist',
      serverEntryPath = 'dist/server/entry-server.js',
      clientManifestPath = 'dist/.vite/manifest.json',
      ssrManifestPath = 'dist/.vite/ssr-manifest.json',
      isProd,
    } = options.ssrOptions;

    const modulePath = path.dirname(url.fileURLToPath(import.meta.resolve(`${moduleName}/package.json`)));
    const clientManifest: vite.Manifest = await import(path.resolve(modulePath, clientManifestPath));
    const ssrManifest: vite.Manifest = await import(path.resolve(modulePath, ssrManifestPath));

    let render: RenderFunction;
    let viteServer;
    if (isProd) {
      const res = await import(path.resolve(modulePath, serverEntryPath));
      render = async (url: string) => {
        return res.render(url, ssrManifest);
      };
    } else {
      viteServer = await vite.createServer({
        root: modulePath,
        appType: 'custom',
        cacheDir: 'node_modules/.vite-ssr',
        server: { middlewareMode: true },
      });
      const importRender = async () => {
        const res = await viteServer!.ssrLoadModule(path.join(moduleName, serverEntryPath));
        return async (url: string) => {
          const devScripts: string = await viteServer!.transformIndexHtml(url, '');

          const { appHtml, headHtml = '' } = await res.render(url, ssrManifest);
          return { appHtml, headHtml: devScripts + headHtml };
        };
      };
      render = await importRender();
      viteServer.watcher.on('change', async () => {
        try {
          render = await importRender();
        } catch (err) {
          fastify.log.error({ err });
        }
      });
    }

    // populate globally accessible data
    let existingSsrAdapterData: SSRAdapterData;
    try {
      existingSsrAdapterData = fastify.getDecorator<SSRAdapterData>('ssrAdapterData');
    } catch (err) {
      fastify.log.info({ err });
      existingSsrAdapterData = new Map();
      fastify.decorate('ssrAdapterData', existingSsrAdapterData);
    }

    const manifestEntry: vite.ManifestChunk | undefined = Object.values(clientManifest).find(
      (item) => item.isEntry === true
    );

    existingSsrAdapterData.set(moduleName, { manifestEntry, render });

    if (isProd) {
      fastify.register(staticPlugin, {
        root: path.resolve(modulePath, assetsPath),
        prefix: `/frontend/${moduleName}`, // matches vite.config `base`
      });
    } else {
      const { port } = viteServer?.config.server || {};
      fastify.register(httpProxyPlugin, {
        upstream: `http://127.0.0.1:${port}/frontend/${moduleName}`,
        prefix: `/frontend/${moduleName}`, // matches vite.config `base`
      });
    }
  }
);
