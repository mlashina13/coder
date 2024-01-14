/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { isServer } from '../utils';
import {
  errorReducer,
  userReducer,
  locationReducer,
  leadboardReducer,
  oauthReducer,
} from './slices';

declare global {
  interface Window {
    // В d.ts нам неважно, что это за тип,
    // так как он сразу попадает в redux store на клиенте
    __PRELOADED_STATE__?: {
      store: object;
      history: unknown;
    };
  }
}

// console.log(serverState);

/**
 * Хранилище приложения
 */
export const store = configureStore({
  reducer: {
    error: errorReducer,
    user: userReducer,
    location: locationReducer,
    leaderboard: leadboardReducer,
    oauth: oauthReducer,
  },
});

export const createStore = (url = '/', initialState: object = {}) => {
  const serverState = window.__PRELOADED_STATE__?.store || initialState;

  return {
    store: configureStore({
      reducer: {
        error: errorReducer,
        user: userReducer,
        location: locationReducer,
        leaderboard: leadboardReducer,
        oauth: oauthReducer,
      },
      preloadedState: serverState,
    }),
  };
};

/**
 * Тип стейта приложения
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Тип диспетчера
 */
export type AppDispatch = typeof store.dispatch;
