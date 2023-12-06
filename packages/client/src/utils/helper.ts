/**
 *  Функция рандомного вычисления
 *  */
import { ImageInterface } from '../pages/GamePages/SettingsPage/SettingsGameInfo/ImageInterface';

export const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

/**
 *  Функция вычисления элемента в масстеве базы знаний для отображения "Интересных фактов"
 *  */
export const getImage = (list: ImageInterface[]): ImageInterface | null => {
  // TODO реализовать механизм вычисления отображения новой информации "Интересных фактов"
  const random = getRandomInt(3);
  return list.length >= random ? list[random] : null;
};
