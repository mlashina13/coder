import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginData, PasswordData, RegistrationData, UserData } from '../types/common';
import { Auth, User } from '../api';

/**
 * Пространство имен
 */
const NAMESPACE = 'user';

/**
 * Вход в систему
 */
export const login = createAsyncThunk<UserData, LoginData>(
  `${NAMESPACE}/login`,
  async (loginData) => {
    await Auth.signIn(loginData);
    const user = await Auth.getAuthUser();
    return user;
  }
);

/**
 * Выход из системы
 */
export const logout = createAsyncThunk<boolean>(`${NAMESPACE}/logout`, async () => {
  await Auth.logOut();
  return true;
});

/**
 * Регистрация
 */
export const registration = createAsyncThunk<UserData, RegistrationData>(
  `${NAMESPACE}/registration`,
  async (registrationData) => {
    await Auth.registration(registrationData);
    const user = await Auth.getAuthUser();
    return user;
  }
);

/**
 * Смена аватара
 */
export const updateAvatar = createAsyncThunk<UserData, FormData>(
  `${NAMESPACE}/updateAvatar`,
  async (formData) => {
    const user = await User.updateUserAvatar(formData);
    return user;
  }
);

/**
 * Обновление данных пользователя
 */
export const updatePersonalData = createAsyncThunk<UserData, UserData>(
  `${NAMESPACE}/updatePersonalData`,
  async (userData) => {
    const user = await User.updateUserData(userData);
    return user;
  }
);

/**
 * Обновление пароля
 */
export const updatePassword = createAsyncThunk<boolean, PasswordData>(
  `${NAMESPACE}/updatePassword`,
  async (passwordData) => {
    await User.updatePassword(passwordData);
    return true;
  }
);
