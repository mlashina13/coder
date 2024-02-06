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
const leaderboardResult = (data: LeaderBoardData) => [
  {
    data: {
      name: 'Test T',
      coderPoint: 12,
      stepsCount: 4,
      colorsCount: 4,
    },
  },
  {
    data: {
      name: 'Мих Ср',
      coderPoint: 11,
      stepsCount: 6,
      colorsCount: 5,
    },
  },
  {
    data: {
      name: 'Новый Т',
      email: 'kkk@mail.ru',
      coderPoint: 11,
      stepsCount: 5,
      colorsCount: 4,
    },
  },
  {
    data: {
      name: 'Новый Н',
      email: 'wwqw@mail.ru',
      coderPoint: 11,
      stepsCount: 5,
      colorsCount: 4,
    },
  },
  {
    data: {
      name: 'Иван Иванов',
      email: 'test@mail.ru',
      coderPoint: 11,
      stepsCount: 5,
      colorsCount: 4,
    },
  },
  {
    data: {
      name: 'Иван И',
      email: 'coder_ivanov@coder_ivanov.ru',
      coderPoint: 11,
      stepsCount: 5,
      colorsCount: 4,
    },
  },
];
// axiosInstance.post<LeaderboardResponse[]>(GET_LEADERBOARD_API, data).then((resp) => resp.data);

/** Сервисы для работы с результатами игр */
export const Leaderboard = {
  leaderboard,
  leaderboardResult,
};
