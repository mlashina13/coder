import { GET_SERVICE_ID, GET_USER_THEME, UPDATE_USER_THEME, YANDEX_SIGNIN } from '../constants';
import { ServiceId, ThemeData, YandexLoginData } from '../types/common';

import { axiosInstance } from './axiosInstance';

/** Обновление темы пользователя */
const updateTheme = (data: ThemeData) =>
  axiosInstance.post<unknown>(UPDATE_USER_THEME, data).then((resp) => resp.data);

/** Получение темы пользователя */
const getTheme = (userId: string) =>
  axiosInstance.get<string>(GET_USER_THEME(userId)).then((resp) => resp.data);

export const UserTheme = {
  updateTheme,
  getTheme,
};
