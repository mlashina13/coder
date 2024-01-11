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
import { dbConnect } from './db';
import { Topic, Comment } from './api/models';

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
  render: () => string;
}

/**
 * Запуск сервера
 */
async function startServer() {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;

  let vite: ViteDevServer | undefined;
  const srcPath = path.resolve(__dirname + '/../client');
  const distPath = path.join(srcPath, 'dist');
  const ssrClientPath = path.resolve(__dirname + '/../client/ssr-dist/client.cjs');

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

  // app.get('/api', (_, res) => {
  //   res.json('👋 Howdy from the server :)');
  // });

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
  }

  app.use('*', cookieParser(), async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;
      if (!isDev()) {
        template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8');
        template = await vite!.transformIndexHtml(url, template);
      }

      let ssrModule: SSRModule;

      if (isDev()) {
        ssrModule = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))) as SSRModule;
      } else {
        ssrModule = await import(ssrClientPath);
      }

      const { render } = ssrModule;
      const html = template.replace(`<!--ssr-outlet-->`, render());

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  await dbConnect();
  // TODO: тестовое наполнение, потом убрать
  await Topic.create({
    authorId: 0,
    messagesCount: 0,
    title: 'test topic',
    viewsCount: 0,
  });
  await Comment.bulkCreate([
    {
      authorId: 1,
      text: 'Комментарий 1',
      topicId: 1,
    },
    {
      authorId: 2,
      text: 'Комментарий 2',
      topicId: 1,
    },
  ]);

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();
