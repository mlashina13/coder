import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserTheme } from '../api';
import { UserData, RegistrationData, ThemeData } from '../types/common';
import { errorToString } from '../utils';
import { AsyncThunkOptions } from '../types/reduxToolkit';
import { setError } from '../store/slices/errorSlice';

/**
 * Пространство имен
 */
const NAMESPACE = 'theme';

/**
 * Обновление темы
 */
export const updateTheme = createAsyncThunk<string, ThemeData, AsyncThunkOptions>(
  `${NAMESPACE}/updateTheme`,
  async (data, { dispatch, rejectWithValue }) => {
    try {
      await UserTheme.updateTheme(data);
      return data.theme;
    } catch (error) {
      dispatch(setError(errorToString(error as Error)));
      return rejectWithValue(errorToString(error as Error));
    }
  }
);

/**
 * Получение темы
 */
export const getTheme = createAsyncThunk<string, string, AsyncThunkOptions>(
  `${NAMESPACE}/getTheme`,
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const theme = await UserTheme.getTheme(userId);
      return theme;
    } catch (error) {
      dispatch(setError(errorToString(error as Error)));
      return rejectWithValue(errorToString(error as Error));
    }
  }
);
