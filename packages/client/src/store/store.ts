import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices';

/**
 * Хранилище приложения
 */
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

/**
 * Тип стейта приложения
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Тип диспетчера
 */
export type AppDispatch = typeof store.dispatch;
