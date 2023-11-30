/* eslint-disable no-param-reassign */
import { createSlice, AnyAction } from '@reduxjs/toolkit';
import { login, logout, registration } from '../../services';
import { UserData } from '../../types/common';

/**
 * Имя среза
 */
const NAME = 'user';

/**
 * Внутренний стейт среза
 */
interface UserState {
  currentUser?: UserData;
  loading: boolean;
}

/**
 * Начальные значения стейта
 */
const initialState: UserState = {
  currentUser: undefined,
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
 * Срез пользователя
 */
const userSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = undefined;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addMatcher(isLoading, (state) => {
        state.loading = true;
      })
      .addMatcher(isError, (state) => {
        state.loading = false;
      });
  },
});

/**
 * Редьюсер для пользователя
 */
export const userReducer = userSlice.reducer;
