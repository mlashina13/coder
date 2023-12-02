import { gradientOffsetX, gradientOffsetY } from '../../consts';

/**
 * Расчет параметров тени для игрового поля
 * @param x Координата по оси X
 * @param y Координата по оси Y
 * @param lightX Координата источника освещения по оси X
 * @param lightY Координата источника освещения по оси Y
 * @param gameChipsFieldWidth Ширина поля с игровыми фишками
 * @param gameChipsFieldHeight Высота поля с игровыми фишками
 */
export const getFieldShadow = (
  x: number,
  y: number,
  lightX: number,
  lightY: number,
  gameChipsFieldWidth: number,
  gameChipsFieldHeight: number
) => {
  /** Угол между источником света и точкой */
  const angleRadians = Math.atan2(y - lightY, x - lightX);
  /** Расстояние между точкой и источником света по формуле Евклидова расстояния */
  const distanceToLight = Math.sqrt((lightX - x) ** 2 + (lightY - y) ** 2);
  /** Радиус градиента тени, который зависит от расстояния до источника света */
  const gradientRadius = distanceToLight / 10;
  /** Наибольшая сторона игрового поля для учета в градиенте */
  const longestSide = Math.max(gameChipsFieldWidth, gameChipsFieldHeight) / gradientRadius;
  /** Смещение для градиента тени по оси X */
  const offsetX = Math.cos(angleRadians) * gradientOffsetX;
  /** Смещение для градиента тени по оси Y */
  const offsetY = Math.sin(angleRadians) * gradientOffsetY;

  return {
    /** Размер размытия тени, учитывая радиус градиента и расстояние до источника света */
    shadowBlur: Math.min(gradientRadius, distanceToLight / (5 * gradientRadius)) * longestSide,
    /** Смещение тени по оси X, учитывая размеры игрового поля и радиус градиента */
    shadowOffsetX: (offsetX * gameChipsFieldWidth) / (2 * gradientRadius),
    /** Смещение тени по оси Y, учитывая размеры игрового поля и радиус градиента */
    shadowOffsetY: (offsetY * gameChipsFieldHeight) / (2 * gradientRadius),
  };
};
