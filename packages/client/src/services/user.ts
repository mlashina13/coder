import { UPDATE_AVATAR_API, UDPATE_USER_DATA_API, UPDATE_PASSWORD_API } from '../constants';
import { PasswordData, UserData } from '../types/common';
import { axiosInstance } from './axiosInstance';

/** обновление аватара пользователя */
const updateUserAvatar = (file: FormData) =>
  axiosInstance.put<UserData>(UPDATE_AVATAR_API, file).then((resp) => resp.data);

/** обновление данных пользователя */
const updateUserData = (userData: UserData) =>
  axiosInstance.put<UserData>(UDPATE_USER_DATA_API, userData).then((resp) => resp.data);

/** обновление пароля */
const updatePassword = (passwordData: PasswordData) =>
  axiosInstance.put<unknown>(UPDATE_PASSWORD_API, passwordData).then((resp) => resp.data);

/** сервисы для работы с данными пользователя */
export const User = {
  updateUserAvatar,
  updateUserData,
  updatePassword,
};
