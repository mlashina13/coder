import { configureStore } from '@reduxjs/toolkit';
import {
  errorReducer,
  userReducer,
  locationReducer,
  leadboardReducer,
  oauthReducer,
  themeReducer,
} from './slices';

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
    themes: themeReducer,
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
