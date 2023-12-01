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
   * Функция перезапуска текущей игры
   * */
  onRestart?: () => void;

  /**
   * Функци запуска новой игры
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
