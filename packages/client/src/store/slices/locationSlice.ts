/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Имя среза
 */
const NAME = 'location';

/**
 * Данные о местоположении пользователя
 */
interface Location {
  latitude: number;
  longitude: number;
}

/**
 * Внутренний стейт среза
 */
interface LocationState {
  location?: Location;
}

/**
 * Начальные значения стейта
 */
const initialState: LocationState = {
  location: undefined,
};

/**
 * Срез глобальной ошибки
 */
const locationSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<Location>) {
      state.location = action.payload;
    },
    clearLocation(state) {
      state.location = undefined;
    },
  },
});

/**
 * Редьюсер для глобальной ошибки
 */
export const locationReducer = locationSlice.reducer;

export const { setLocation, clearLocation } = locationSlice.actions;
