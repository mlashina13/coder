import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { App } from './src/App';
import { initialState as userInitialState } from './src/store/slices/userSlice';
import { initialState as errorInitialState } from './src/store/slices/errorSlice';

export function render() {
  // TODO: заглушки для стора. Будут доработаны
  // в следующих задачах
  const userSlicePlug = createSlice({
    initialState: userInitialState,
    name: 'user',
    reducers: {},
  });
  const errorSlicePlug = createSlice({
    initialState: errorInitialState,
    name: 'error',
    reducers: {},
  });
  const store = configureStore({
    reducer: {
      user: userSlicePlug.reducer,
      error: errorSlicePlug.reducer,
    },
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
