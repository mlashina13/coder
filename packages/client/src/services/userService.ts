/* eslint-disable no-unreachable */
/* eslint-disable no-param-reassign */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  LoginData,
  PasswordData,
  RegistrationData,
  ServiceId,
  UserData,
  YandexLoginData,
} from '../types/common';
import { Auth, User, YandexAuth } from '../api';
import { errorToString } from '../utils';
import { AsyncThunkOptions } from '../types/reduxToolkit';
import { setError } from '../store/slices/errorSlice';

/**
 * Пространство имен
 */
const NAMESPACE = 'user';

/**
 * Проверить, авторизован ли пользователь
 */
export const checkAuth = createAsyncThunk<UserData | undefined>(
  `${NAMESPACE}/checkAuth`,
  async () => {
    const user = {
      email: 'coder@mail.ru',
      first_name: 'Coder',
      phone: '+79152665410',
      second_name: 'Кодировщик',
      avatar:
        '/3af7e292-f95c-473b-b97d-f0315d16cc09/2f83fbf6-6442-44af-acc1-3c222a123a78_png-transparent-programming-code-application-development-computer-coding-digital-cyber-security-solid-threat-protection-icon.png',
      display_name: 'CoderUser',
      id: '1349902',
      login: 'coder',
    } as UserData;
    return user;
    // try {
    //   const user = await Auth.getAuthUser();
    //   return user;
    // } catch {
    //   return undefined;
    // }
  }
);

/**
 * Вход в систему
 */
export const login = createAsyncThunk<UserData, LoginData, AsyncThunkOptions>(
  `${NAMESPACE}/login`,
  async (loginData, { dispatch, rejectWithValue }) => {
    try {
      await Auth.signIn(loginData);
      const user = await Auth.getAuthUser();
      return user;
    } catch (error) {
      dispatch(setError(errorToString(error as Error)));
      return rejectWithValue(errorToString(error as Error));
    }
  }
);

/**
 * Выход из системы
 */
export const logout = createAsyncThunk<boolean, undefined, AsyncThunkOptions>(
  `${NAMESPACE}/logout`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await Auth.logOut();
      return true;
    } catch (error) {
      dispatch(setError(errorToString(error as Error)));
      return rejectWithValue(errorToString(error as Error));
    }
  }
);

/**
 * Регистрация
 */
export const registration = createAsyncThunk<UserData | undefined, RegistrationData>(
  `${NAMESPACE}/registration`,
  async (registrationData, { dispatch, rejectWithValue }) => {
    try {
      await Auth.registration(registrationData);
      const user = await Auth.getAuthUser();
      return user;
    } catch (error) {
      dispatch(setError(errorToString(error as Error)));
      return rejectWithValue(errorToString(error as Error));
    }
  }
);

/**
 * Смена аватара
 */
export const updateAvatar = createAsyncThunk<UserData | undefined, FormData, AsyncThunkOptions>(
  `${NAMESPACE}/updateAvatar`,
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const user = await User.updateUserAvatar(formData);
      return user;
    } catch (error) {
      dispatch(setError(errorToString(error as Error)));
      return rejectWithValue(errorToString(error as Error));
    }
  }
);

/**
 * Обновление данных пользователя
 */
export const updatePersonalData = createAsyncThunk<UserData, UserData, AsyncThunkOptions>(
  `${NAMESPACE}/updatePersonalData`,
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      // const user = await User.updateUserData(userData);
      return userData;
    } catch (error) {
      dispatch(setError(errorToString(error as Error)));
      return rejectWithValue(errorToString(error as Error));
    }
  }
);

/**
 * Обновление пароля
 */
export const updatePassword = createAsyncThunk<boolean, PasswordData, AsyncThunkOptions>(
  `${NAMESPACE}/updatePassword`,
  async (passwordData, { dispatch, rejectWithValue }) => {
    try {
      // await User.updatePassword(passwordData);
      return true;
    } catch (error) {
      dispatch(setError(errorToString(error as Error)));
      return rejectWithValue(errorToString(error as Error));
    }
  }
);

/** получение  service_id-приложения */
export const getServiceId = createAsyncThunk<ServiceId | undefined>(
  `${NAMESPACE}/serviceId`,
  async () => {
    try {
      const serviceData = await YandexAuth.getServiceId();
      return serviceData;
    } catch {
      return undefined;
    }
  }
);

/**
 * Вход в систему через яндекс
 */
export const yandexLogin = createAsyncThunk<UserData, YandexLoginData, AsyncThunkOptions>(
  `${NAMESPACE}/yandexLogin`,
  async (loginData, { dispatch, rejectWithValue }) => {
    try {
      await YandexAuth.signIn(loginData);
      const user = await Auth.getAuthUser();
      return user;
    } catch (error) {
      dispatch(setError(errorToString(error as Error)));
      return rejectWithValue(errorToString(error as Error));
    }
  }
);
