/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-danger */
import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { App } from './src/App';

export function render(store: any) {
  return renderToString(
    <Provider store={store}>
      {/* TODO: router будет доработан в следующих задачах */}
      <StaticRouter location='/'>
        <App />
      </StaticRouter>
    </Provider>
  );
}

export function getPageHtml(bundleHtml: string, state: any) {
  const html = renderToStaticMarkup(
    <html lang='ru'>
      <head>
        <link rel='icon' type='image/svg+xml' href='/icon.svg' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Coder</title>
      </head>
      <body>
        <div id='root' dangerouslySetInnerHTML={{ __html: bundleHtml }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${state}`,
          }}
        />
        <script type='module' src='/src/main.tsx' />
      </body>
    </html>
  );

  return `<!doctype html>${html}`;
}
