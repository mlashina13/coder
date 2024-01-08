// TODO: линтер сходит с ума, поэтому позднее, если останется время,
// поправим это, пока что все дизейблы ниже нужны
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';

import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';
import 'localstorage-polyfill';
import { Image } from 'canvas';
import { TextEncoder, TextDecoder } from 'util';
import type { StoreType } from './store';
// import { store as serverStore } from './store';

dotenv.config();

// Лечим канвас
Object.assign(global, {
  Image,
  TextEncoder,
  TextDecoder,
});

const isDev = () => process.env.NODE_ENV === 'development';

/**
 * Описание модуля с SSR
 */
interface SSRModule {
  render: (store: any) => string;
  storeFunction: (store: any) => string;
  getPageHtml: (bundleHtml: string, store: any) => string;
}

/**
 * Запуск сервера
 */
async function startServer() {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;

  let vite: ViteDevServer | undefined;
  const distPath = path.dirname(require.resolve('client/dist/index.html'));
  const srcPath = path.dirname(require.resolve('client'));
  const ssrClientPath = require.resolve('client/ssr-dist/ssr.cjs');

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });
    app.use(vite.middlewares);
  }

  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: 'https://ya-praktikum.tech',
    })
  );

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
  }

  app.use('*', cookieParser(), async (req, res, next) => {
    const url = req.originalUrl;

    let ssrModule: SSRModule;

    if (isDev()) {
      ssrModule = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))) as SSRModule;
    } else {
      ssrModule = await import(ssrClientPath);
    }

    // let serverStore: StoreType;

    // if (isDev()) {
    const serverStore = (
      await vite!.ssrLoadModule(path.resolve(`${srcPath}/src/store`, 'store.ts'))
    ).store as StoreType;
    // } else {
    //   serverStore = await import(ssrClientPath);
    // }

    const { render } = ssrModule;

    try {
      let template: string;
      if (!isDev()) {
        template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8');
        // TODO: Обсудить с Кириллом ssrModule.getPageHtml
        template = await vite!.transformIndexHtml(
          url,
          ssrModule.getPageHtml(render(serverStore), serverStore)
        ); // template);
      }

      // TODO: Использовать template.replace если возможно и убрать dangerouslySetInnerHTML
      const html = template.replace(`<!--ssr-outlet-->`, render(serverStore));

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();
