/* eslint-disable no-param-reassign */
import { createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';

import { getServiceId, logout } from '../../services';

/**
 * Получить сохраненное значение serviceId из localStorage
 */
const getserviceIdLocalStorage = () => {
  const serviceId = localStorage.getItem('serviceId');
  if (serviceId) {
    return JSON.parse(serviceId);
  }
  return undefined;
};

/**
 * Установит значение serviceId в localStorage
 */
const setserviceIdToLocalStorage = (serviceId?: string) => {
  if (!serviceId) {
    localStorage.removeItem('serviceId');
  } else {
    localStorage.setItem('serviceId', JSON.stringify(serviceId));
  }
};

/**
 * Имя среза
 */
const NAME = 'serviceId';

/**
 * Внутренний стейт среза
 */
interface ServiceIdState {
  serviceId?: string;
  loading: boolean;
  serviceIdError?: string;
}

/**
 * Начальные значения стейта
 */
const initialState: ServiceIdState = {
  serviceId: getserviceIdLocalStorage(),
  loading: false,
  serviceIdError: undefined,
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
 * Срез serviceId
 */
const serviceIdSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getServiceId.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceId = action.payload?.service_id;
        setserviceIdToLocalStorage(action.payload?.service_id);
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.serviceId = undefined;
        setserviceIdToLocalStorage();
      })
      .addMatcher(isLoading, (state) => {
        state.loading = true;
        state.serviceIdError = undefined;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.serviceIdError = action.payload;
      });
  },
});

/**
 * Редьюсер для пользователя
 */
export const oauthReducer = serviceIdSlice.reducer;
