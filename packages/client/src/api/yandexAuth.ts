import { GET_SERVICE_ID, YANDEX_SIGNIN } from '../constants';
import { ServiceId, YandexLoginData } from '../types/common';

import { axiosInstance } from './axiosInstance';

const getServiceId = () => axiosInstance.get<ServiceId>(GET_SERVICE_ID).then((resp) => resp.data);

const signIn = (data: YandexLoginData) =>
  axiosInstance.post<unknown>(YANDEX_SIGNIN, data).then((resp) => resp.data);

export const YandexAuth = {
  getServiceId,
  signIn,
};
