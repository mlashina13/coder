import { AxiosRequestConfig } from 'axios';
import { GET_SERVICE_ID, GET_USER_THEME, UPDATE_USER_THEME, YANDEX_SIGNIN } from '../constants';
import { ServiceId, ThemeData, YandexLoginData } from '../types/common';

import { axiosInstance } from './axiosInstance';

/** Обновление темы пользователя */
const updateTheme = (data: ThemeData, opts?: AxiosRequestConfig) =>
  axiosInstance
    .post<{ data: unknown }>(UPDATE_USER_THEME, data, opts)
    .then((resp) => resp.data.data);

/** Получение темы пользователя */
const getTheme = (userId: string, opts?: AxiosRequestConfig) =>
  axiosInstance.get<{ data: string }>(GET_USER_THEME(userId), opts).then((resp) => resp.data.data);

export const UserTheme = {
  updateTheme,
  getTheme,
};
