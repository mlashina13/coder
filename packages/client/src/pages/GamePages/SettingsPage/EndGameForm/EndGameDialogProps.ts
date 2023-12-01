import type { LossStatistics, WinStatistics } from '../../../../components/GameField/Game/types';

/**
 * Описанние параметров завершения игры
 * */
export interface EndGameDialogProps {
  /**
   * Параметры статистики игры
   * */
  statistic?: WinStatistics | LossStatistics;

  /**
   * Открытие диалогового окна
   * */
  openDialog: boolean;

  /**
   * Функция перезагрузки текущей игры
   * */
  onRestart?: () => void;

  /**
   * Играть заново новую игру
   * */
  onStartNewGame?: () => void;

  /**
   * Переход на главную страницу
   * */
  onGoToMainPage: () => void;

  /**
   * Переход на страницу Информации
   * */
  onGoToInfoPage: () => void;
}
