// eslint-disable-next-line import/no-extraneous-dependencies
import {
  EnhancedStore,
  StoreEnhancer,
  ThunkDispatch,
  Tuple,
  UnknownAction,
  configureStore,
} from '@reduxjs/toolkit';
import { errorReducer, locationReducer } from './slices';

export type StoreType = EnhancedStore<
  Record<string, unknown>,
  UnknownAction,
  Tuple<
    [
      StoreEnhancer<{
        dispatch: ThunkDispatch<Record<string, unknown>, undefined, UnknownAction>;
      }>,
      StoreEnhancer
    ]
  >
>;

/**
 * Хранилище приложения
 */
export const store: StoreType = configureStore({
  reducer: {
    error: errorReducer,
    // user: userReducer,
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
