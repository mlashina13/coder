/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import serialize from 'serialize-javascript';

import express from 'express';
import * as path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cookieParser from 'cookie-parser';
import 'localstorage-polyfill';
import { Image } from 'canvas';
import { TextEncoder, TextDecoder } from 'util';
import type { Action, Store } from '@reduxjs/toolkit';
import { json } from 'body-parser';
import { dbConnect, presetForumData, presetEmoji, presetTheme } from './dal';
import router from './routing/router';
import { YandexService } from './api/services';

dotenv.config();

// Лечим канвас
Object.assign(global, {
  Image,
  TextEncoder,
  TextDecoder,
});

const isDev = () => process.env.NODE_ENV === 'development';
// console.log('isDev', process.env.NODE_ENV, isDev());
const renderObject = (data: unknown) => serialize(data).replace(/</g, '\\\u003c');

/**
 * Описание модуля с SSR
 */
interface SSRModule {
  render: (store: Store<unknown, Action>, location: string) => string;
  getPageHtml: (bundleHtml: string, state: unknown) => string;
}

/**
 * Запуск сервера
 */
async function startServer() {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;

  // let vite: ViteDevServer | undefined;
  const srcPath = path.resolve('./packages/client');
  const distPath = path.join(srcPath, 'dist');
  const ssrClientPath = path.resolve('./packages/client/ssr-dist/ssr.cjs');

  // console.log('__dirname', __dirname);
  // console.log('srcPath', srcPath);
  // console.log('distPath', distPath);
  // console.log('ssrClientPath', ssrClientPath);

  // if (isDev()) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    root: srcPath,
    appType: 'custom',
  });
  app.use(vite.middlewares);
  // }

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

  app.use(json());
  app.use(
    '/api/v1',
    cookieParser(),
    async (req, res, next) => {
      // const yandexService = new YandexService(req.headers.cookie);
      // let currentUser = await yandexService.getCurrentUser();
      // if (!currentUser) {
      //  res.status(403).send('You are have no permissions for this App section');
      const currentUser = {
        id: 1349902,
        first_name: 'Coder',
        second_name: 'Кодировщик',
        display_name: null,
        login: 'coder',
        avatar: '',
        email: 'coder@mail.ru',
        phone: '+79152665410',
      };
      // }

      (req as any).currentUser = currentUser;
      next();
    },
    router
  );

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

    console.log('vite', vite);
    console.log('ssrModule', ssrModule);
    const serverStore = (
      await vite!.ssrLoadModule(path.resolve(`${srcPath}/src/store`, 'store.ts'))
    ).store;

    const { render, getPageHtml } = ssrModule;

    try {
      const location = req.url;
      const preloadedState = serverStore.getState();
      const bundleHtml = render(serverStore, location);
      const template = getPageHtml(bundleHtml, renderObject(preloadedState));
      const html = await vite!.transformIndexHtml(url, template);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  await dbConnect();

  await presetForumData();
  await presetTheme();
  await presetEmoji();

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();
