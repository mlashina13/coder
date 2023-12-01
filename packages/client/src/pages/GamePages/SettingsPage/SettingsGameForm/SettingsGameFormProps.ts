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
  isColorsMayBeRepeated: boolean;

  /**
   * Размер поля
   */
  stepsCount: string;
}
