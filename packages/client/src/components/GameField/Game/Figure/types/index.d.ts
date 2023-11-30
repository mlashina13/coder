import type { CHIP_COLORS } from '../../consts';

/** Интерфейс используется для передачи аргументов в абстрактный класс {@link Figure} */
export interface BaseFigureProps {
  /** Координата по оси X */
  x: number;
  /** Координата по оси Y */
  y: number;
  /** Текущий цвет фигуры */
  color: CHIP_COLORS;
  /** Радиус фигуры */
  radius: number;
  /** Кооордината источника света по оси X */
  lightX: number;
  /** Кооордината источника света по оси Y */
  lightY: number;
  /** Контекст canvas */
  ctx: CanvasRenderingContext2D;
}

/**
 * Тип фигуры используется для определения того, как необходимо отрисовывать фигуру в классе ${@link Figure}:
 * * flat – плоская фигура;
 * * concave – вогнутая фигура;
 * * convex – выпуклая фигура.
 */
export type FigureTypes = 'flat' | 'concave' | 'convex';
