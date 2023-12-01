import { SettingsGameFormProps } from './SettingsGameForm/SettingsGameFormProps';

/**
 * Интерфейс настроек для игры"
 */
export type SettingsGameProviderState = {
  /**
   * Врема прохождение игра
   */
  time: string;

  /**
   * Количество цветов
   */
  colorsCount: string;

  /**
   * Уровень сложности, есть ли в последовательности повторяющиеся цвета или нет
   */
  isColorsMayBeRepeated: string;

  /**
   * Размер поля
   */
  stepsCount: string;

  /**
   * Переключатель между игрой  и информацией
   * */
  visible: boolean;
};

export type ActionType = {
  type: string;
  settingsGame: SettingsGameProviderState;
};
