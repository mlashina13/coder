import { axiosInstance } from './axiosInstance';
import { GET_LEADERBOARD_API, LEADERBOARD_API } from '../constants/api';
import {
  LeaderBoardData,
  LeaderboardResponse,
  UserLeaderboardData,
} from '../services/leaderboardService/leaderboardInterfaces';

/** Сохранение результатов пользователя */
const leaderboard = (data: UserLeaderboardData) =>
  axiosInstance.post<unknown>(LEADERBOARD_API, data).then((resp) => resp.data);

/** Получение таблицы результатов */
const leaderboardResult = (data: LeaderBoardData) =>
  axiosInstance.post<LeaderboardResponse[]>(GET_LEADERBOARD_API, data).then((resp) => resp.data);

/** Сервисы для работы с результатами игр */
export const Leaderboard = {
  leaderboard,
  leaderboardResult,
};
