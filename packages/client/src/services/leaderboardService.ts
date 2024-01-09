/* eslint-disable no-param-reassign */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Leaderboard } from '../api/index';
import { AsyncThunkOptions } from '../types/reduxToolkit';
import { errorToString } from '../utils/errorUtils';
import { setError } from '../store/slices/errorSlice';
import {
  LeaderBoardData,
  LeaderboardResponse,
  UserLeaderboardData,
} from './leaderboardService/leaderboardInterfaces';

/**
 * Пространство имен
 */
const NAMESPACE = 'leaderboard';

// @ts-ignore
/**
 * Получение результатов игроков
 */
export const getLeaderboards = createAsyncThunk<
  LeaderboardResponse[] | undefined,
  LeaderBoardData,
  AsyncThunkOptions
>(`${NAMESPACE}/all`, async (leaderbord, { dispatch, rejectWithValue }) => {
  try {
    const leaderboard = await Leaderboard.leaderboardResult(leaderbord);
    return leaderboard;
  } catch (error) {
    dispatch(setError(errorToString(error as Error)));
    return rejectWithValue(errorToString(error as Error));
  }
});

/**
 * Добавление пользователя в таблицу результатов
 */
export const addLeaderboard = createAsyncThunk<boolean, UserLeaderboardData, AsyncThunkOptions>(
  `${NAMESPACE}`,
  async (addLeaderbord, { dispatch, rejectWithValue }) => {
    try {
      await Leaderboard.leaderboard(addLeaderbord);
      return true;
    } catch (error) {
      dispatch(setError(errorToString(error as Error)));
      return rejectWithValue(errorToString(error as Error));
    }
  }
);
