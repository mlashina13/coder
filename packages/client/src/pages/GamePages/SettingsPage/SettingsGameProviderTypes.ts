/**
 * Интерфейс настроек для игры"
 */
export type SettingsGameProviderState = {
  /**
   * Врема прохождение игра
   */
  time?: number;

  /**
   * Количество цветов
   */
  colorsCount: number;

  /**
   * Уровень сложности, есть ли в последовательности повторяющиеся цвета или нет
   */
  isColorsMayBeRepeated: string;

  /**
   * Размер поля
   */
  stepsCount: number;

  /**
   * Переключатель между игрой  и информацией
   * */
  visible: boolean;

  /**
   * Идентификатор для инетерсной информации
   * */
  infoId?: number;
};

export type ActionType = {
  type: string;
  settingsGame: SettingsGameProviderState;
};
