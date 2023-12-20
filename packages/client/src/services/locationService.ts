import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearLocation, setLocation } from '../store/slices/locationSlice';

const namespace = 'location';

export const findLocation = createAsyncThunk(`${namespace}/findLocation`, (_, { dispatch }) => {
  try {
    if (!navigator.geolocation) {
      console.warn('Поиск геолокации не поддерживается браузером');

      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      const { longitude, latitude } = position.coords;

      dispatch(setLocation({ longitude, latitude }));
    };

    const onError = () => console.error('Не удалось определить геолокацию');

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } catch {
    dispatch(clearLocation());
  }
});
