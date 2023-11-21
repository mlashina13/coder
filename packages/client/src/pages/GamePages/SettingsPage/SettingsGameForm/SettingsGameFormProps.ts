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
  type: string;

  /**
   * Размер поля
   */
  stepsCount: string;
}
