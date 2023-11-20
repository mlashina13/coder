import axios from 'axios';
import { GET_AUTH_USER_API, LOG_OUT_API, REGISTRATION, SIGN_IN_API } from '../constants';
import { RegistrationData, UserData } from '../types/common';
import { axiosInstance } from './axiosInstance';

/** авторизация */
const signIn = (data: Pick<RegistrationData, 'login' | 'password'>) =>
  axiosInstance.post<unknown>(SIGN_IN_API, data).then((resp) => resp.data);

/** получение данных по текущему пользователю */
const getAuthUser = () => axiosInstance.get<UserData>(GET_AUTH_USER_API).then((resp) => resp.data);

/** регистрация пользователя */
const registration = (data: RegistrationData) =>
  axiosInstance.post<unknown>(REGISTRATION, data).then((resp) => resp.data);

/** выход из приложения */
const logOut = () => axiosInstance.post<unknown>(LOG_OUT_API).then((resp) => resp.data);

/** сервисы для работы с авторизацией */
export const Auth = {
  signIn,
  getAuthUser,
  registration,
  logOut,
};
