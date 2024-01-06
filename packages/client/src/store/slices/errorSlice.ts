/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Имя среза
 */
const NAME = 'globalError';

/**
 * Внутренний стейт среза
 */
interface ErrorState {
  error?: string;
}

/**
 * Начальные значения стейта
 */
export const initialState: ErrorState = {
  error: undefined,
};

/**
 * Срез глобальной ошибки
 */
const errorSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    resetError(state) {
      state.error = undefined;
    },
  },
});

/**
 * Редьюсер для глобальной ошибки
 */
export const errorReducer = errorSlice.reducer;

export const { setError, resetError } = errorSlice.actions;
