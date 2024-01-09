import { LeaderboardInfoData } from '../../types/common';

export interface UserLeaderboardData {
  /** Данные по игре */
  data: LeaderboardInfoData;

  /** Поле для сравнения результата игры */
  ratingFieldName: string;

  /** Наименование команды */
  teamName: string;
}

/** Получение данных по лидерборду */
export interface LeaderBoardData {
  /** Курсор для пагинации */
  cursor?: number;

  /** Количество максимальных элементов в таблице leaderboard */
  limit?: number;

  /** Поле поле для сравнения результата игры */
  ratingFieldName?: string;
}

/**
 * Таблица результатов
 */
export interface LeaderboardResponse {
  data?: LeaderboardInfoData;
}

export type LeaderboardResponseData = LeaderboardResponse[];
