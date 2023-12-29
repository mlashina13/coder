/* eslint-disable no-param-reassign */
import { createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import {
  checkAuth,
  login,
  logout,
  registration,
  updateAvatar,
  updatePassword,
  updatePersonalData,
  yandexLogin,
} from '../../services';
import { UserData } from '../../types/common';

/**
 * Получить сохраненное значение пользователя из localStorage
 */
const getUserFromLocalStorage = () => {
  const savedUserJSON = localStorage.getItem('currentUser');
  if (savedUserJSON) {
    return JSON.parse(savedUserJSON) as UserData;
  }
  return undefined;
};

/**
 * Установит значение пользователя в localStorage
 */
const setUserToLocalStorage = (user?: UserData) => {
  if (!user) {
    localStorage.removeItem('currentUser');
  } else {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
};

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
  userError?: string;
}

/**
 * Начальные значения стейта
 */
const initialState: UserState = {
  currentUser: getUserFromLocalStorage(),
  loading: false,
  userError: undefined,
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
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        setUserToLocalStorage(action.payload);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        setUserToLocalStorage(action.payload);
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = undefined;
        setUserToLocalStorage();
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        setUserToLocalStorage(action.payload);
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        setUserToLocalStorage(action.payload);
      })
      .addCase(updatePersonalData.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        setUserToLocalStorage(action.payload);
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(yandexLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        setUserToLocalStorage(action.payload);
      })
      .addMatcher(isLoading, (state) => {
        state.loading = true;
        state.userError = undefined;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.userError = action.payload;
      });
  },
});

/**
 * Редьюсер для пользователя
 */
export const userReducer = userSlice.reducer;
