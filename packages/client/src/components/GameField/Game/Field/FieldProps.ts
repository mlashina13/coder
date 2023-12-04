export type FieldProps = {
  /** Объект canvas */
  canvas: HTMLCanvasElement;
  /** Контекст canvas */
  ctx: CanvasRenderingContext2D;
  /** Размер игровой фишки */
  chipSize: number;
  /** Количество цветов в последовательности */
  colorsInRowCount: number;
  /** Максимальное количество ходов */
  maxStepsCount: number;
  /** Координата источника освещения по оси X */
  lightX: number;
  /** Координата источника освещения по оси Y */
  lightY: number;
};
