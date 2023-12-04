import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

/**
 * Параметры AsyncThunk
 */
export interface AsyncThunkOptions {
  /**
   * Возвращаемое значение при ошибке
   */
  rejectValue: string;

  /**
   * Диспетчер
   */
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
}
