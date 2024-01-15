/* eslint-disable no-param-reassign */
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTheme, updateTheme } from '../../services/userThemeService';
import { DARK_THEME, LIGHT_THEME } from '../../constants';

/**
 * Имя среза
 */
const NAME = 'theme';

type Theme = string;

const getActualTheme = (theme: string) =>
  [DARK_THEME, LIGHT_THEME].includes(theme)
    ? theme
    : localStorage.getItem('theme') || document.documentElement.dataset.theme || LIGHT_THEME;

/**
 * Внутренний стейт среза
 */
interface ThemeState {
  actualTheme?: Theme;
  loading: boolean;
  themeError?: string;
}

/**
 * Начальные значения стейта
 */
const initialState: ThemeState = {
  actualTheme: undefined,
  loading: false,
};

/**
 * Action для состояния загрузки
 */
const isLoading = (action: AnyAction) => action.type.endsWith('pending');

/**
 * Action для состояния ошибки
 */
const isError = (action: AnyAction) => action.type.endsWith('rejected');

/**
 * Срез выбранной темы
 */
const themeSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTheme.fulfilled, (state, action) => {
        state.loading = false;
        const theme = getActualTheme(action.payload);
        state.actualTheme = theme;
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
      })
      .addCase(getTheme.fulfilled, (state, action) => {
        state.loading = false;
        const theme = getActualTheme(action.payload);
        if (state.actualTheme !== theme) {
          state.actualTheme = theme;
          document.documentElement.dataset.theme = theme;
          localStorage.setItem('theme', theme);
        }
      })
      .addMatcher(isLoading, (state) => {
        state.loading = true;
        state.themeError = undefined;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.themeError = action.payload;
      });
  },
});

/**
 * Редьюсер для выбранной темы
 */
export const themeReducer = themeSlice.reducer;

// export const { setTheme } = themeSlice.actions;
