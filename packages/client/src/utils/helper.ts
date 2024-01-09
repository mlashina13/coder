/**
 *  Функция рандомного вычисления
 *  */
import { ImageInterface } from '../pages/GamePages/SettingsPage/SettingsGameInfo/ImageInterface';
import { LeaderboardInfoData } from '../types/common';
import { SettingsGameProviderState } from '../pages/GamePages/SettingsPage/SettingsGameProviderTypes';

export const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

/**
 *  Функция вычисления элемента в масстеве базы знаний для отображения "Интересных фактов"
 *  */
export const getImage = (list: ImageInterface[]): ImageInterface | null => {
  // TODO реализовать механизм вычисления отображения новой информации "Интересных фактов"
  const random = getRandomInt(3);
  return list.length >= random ? list[random] : null;
};

/**
 * Функция расчета очков
 * */
export const calculationPoints = (settings: SettingsGameProviderState): LeaderboardInfoData => {
  const { colorsCount, stepsCount, time } = settings;
  let calc = 0;
  const result: LeaderboardInfoData = { colorsCount, stepsCount };
  calc += colorsCount || 3;
  calc += 10 - (stepsCount || 10);
  calc += time ? 2 : 0;
  result.coderPoint = calc;
  return result;
};
