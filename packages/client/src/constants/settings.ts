/**
 * Настроки по умолчанию для игры
 */
import { GAME_TYPES } from '../components/GameField/Game/consts/index';

export const SETTINGS = {
  colorsCount: 4,
  stepsCount: 1,
  isColorsMayBeRepeated: GAME_TYPES.withoutColorsRepeated,
  time: 10,
};
