/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DARK_THEME, LIGHT_THEME } from '../../constants';

/**
 * Имя среза
 */
const NAME = 'theme';

type Theme = typeof LIGHT_THEME | typeof DARK_THEME;

/**
 * Внутренний стейт среза
 */
interface ThemeState {
  actualTheme: Theme;
}

/**
 * Начальные значения стейта
 */
const initialState: ThemeState = {
  actualTheme: 'light',
};

/**
 * Срез выбранной темы
 */
const themeSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.actualTheme = action.payload;
    },
  },
});

/**
 * Редьюсер для выбранной темы
 */
export const themeReducer = themeSlice.reducer;

export const { setTheme } = themeSlice.actions;
