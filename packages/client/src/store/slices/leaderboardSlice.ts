/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getLeaderboards } from '../../services/leaderboardService';
import { LeaderboardResponse } from '../../services/leaderboardService/leaderboardInterfaces';

/**
 * Имя среза
 */
const NAME = 'leaderboard';

/**
 * Внутренний срез результатов
 */
interface LeaderboardState {
  leaderboard?: LeaderboardResponse[];
  loading: boolean;
  leaderboardError?: string;
}

/**
 * Начальные значения стейта
 */
const initialState: LeaderboardState = {
  leaderboard: [],
  loading: false,
  leaderboardError: undefined,
};

/**
 * Срез глобальных результатов
 */
const leadboardSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboards.pending, (state) => {
        state.loading = true;
        state.leaderboardError = undefined;
      })
      .addCase(getLeaderboards.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboard = action.payload;
      })
      .addCase(getLeaderboards.rejected, (state, action) => {
        state.loading = false;
        state.leaderboardError = action.payload as string;
      });
  },
});

/**
 * Редьюсер для глобальных результатов
 */
export const leadboardReducer = leadboardSlice.reducer;
