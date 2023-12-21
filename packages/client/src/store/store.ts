import { configureStore } from '@reduxjs/toolkit';
import { errorReducer, userReducer, locationReducer } from './slices';

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

/**
 * Тип стейта приложения
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Тип диспетчера
 */
export type AppDispatch = typeof store.dispatch;
