/**
 *  Расчет расстояния до источника света
 * @param vectorX Вектор по оси X
 * @param vectorY Вектор по оси Y
 */
const calcDistanceToLight = (vectorX: number, vectorY: number) =>
  Math.sqrt(vectorX ** 2 + vectorY ** 2);

/**
 * Расчет нормализованных векторов до источника света
 * @param vectorX Вектор по оси X
 * @param vectorY Вектор по оси Y
 */
export const calcNormalizedVectors = ({
  vectorX,
  vectorY,
}: {
  vectorX: number;
  vectorY: number;
}) => {
  const distanceToLight = calcDistanceToLight(vectorX, vectorY);

  return {
    normalizedVectorX: vectorX / distanceToLight,
    normalizedVectorY: vectorY / distanceToLight,
  };
};

/**
 * Очистка параметров тени
 * @param ctx Контекст canvas
 */
export const clearShadow = (ctx: CanvasRenderingContext2D) => {
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
};
