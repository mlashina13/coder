import type { GAME_TYPES } from '../../../../components/GameField/Game/consts';

/**
 * Интерфейс настроек для игры"
 */
export interface SettingsGameFormProps {
  /**
   * Врема прохождение игра
   */
  time: string;

  /**
   * Количество цветов
   */
  colorsCount: string;

  /**
   * Уровень сложности
   */
  type: GAME_TYPES;

  /**
   * Размер поля
   */
  stepsCount: string;
}
