import { configureStore } from '@reduxjs/toolkit';
import { errorReducer, userReducer, locationReducer } from './slices';

declare global {
  interface Window {
    // В d.ts нам неважно, что это за тип,
    // так как он сразу попадает в redux store на клиенте
    __PRELOADED_STATE__?: object;
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
  },
});

export const createStore = () => {
  const serverState = window.__PRELOADED_STATE__ || {};

  return configureStore({
    reducer: {
      error: errorReducer,
      user: userReducer,
      location: locationReducer,
    },
    preloadedState: serverState,
  });
};

/**
 * Тип стейта приложения
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Тип диспетчера
 */
export type AppDispatch = typeof store.dispatch;
