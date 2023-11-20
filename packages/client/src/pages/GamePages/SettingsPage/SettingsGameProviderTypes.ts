import { SettingsGameFormProps } from './SettingsGameForm/SettingsGameFormProps';

/**
 * Интерфейс настроек для игры"
 */
export type SettingsGameProviderState = {
  /**
   * Врема прохождение игра
   */
  time?: string;

  /**
   * Количество цветов
   */
  colorsCount?: string;

  /**
   * Уровень сложности
   */
  type?: string;

  /**
   * Размер поля
   */
  stepsCount?: string;

  /**
   * Переключатель между игрой  и информацией
   * */
  visible: boolean;
  /**
   * Финкция видимости игры
   * */

  show?: () => void;
};

export type ActionType = {
  type: string;
  settings?: SettingsGameFormProps;
};
