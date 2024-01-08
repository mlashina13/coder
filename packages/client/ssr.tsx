/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-danger */
import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import serialize from 'serialize-javascript';
import { App } from './src/App';
import { errorReducer, userReducer, locationReducer } from './src/store';
import { initialState as userInitialState } from './src/store/slices/userSlice';
import { initialState as errorInitialState } from './src/store/slices/errorSlice';

const renderObject = (data: unknown) => serialize(data).replace(/</g, '\\\u003c');

export function render(initialState: any) {
  // TODO: заглушки для стора. Будут доработаны
  // в следующих задачах
  // const userSlicePlug = createSlice({
  //   initialState: userInitialState,
  //   name: 'user',
  //   reducers: {},
  // });
  // const errorSlicePlug = createSlice({
  //   initialState: errorInitialState,
  //   name: 'error',
  //   reducers: {},
  // });
  const store = configureStore({
    reducer: {
      user: userReducer,
      error: errorReducer,
      location: locationReducer,
    },
    preloadedState: initialState.getState(),
  });

  return renderToString(
    <Provider store={store}>
      {/* TODO: router будет доработан в следующих задачах */}
      <StaticRouter location='/'>
        <App />
      </StaticRouter>
    </Provider>
  );
}

export function getPageHtml(bundleHtml: string, store: any) {
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
            __html: `window.__PRELOADED_STATE__ = ${renderObject(store.getState())}`,
          }}
        />
        <script type='module' src='/src/main.tsx' />
      </body>
    </html>
  );

  return `<!doctype html>${html}`;
}

export const storeFunction = (store: any) => {
  console.log(store);
  return renderToStaticMarkup(
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `window.__PRELOADED_STATE__ = ${renderObject(store.getState())}`,
      }}
    />
  );
};
