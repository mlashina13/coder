import {
  backgroundColor,
  chipColors,
  lighterChipColors,
  gradientOffsetX,
  gradientOffsetY,
  gradientRadius,
} from '../consts';
import type { BaseFigureProps } from './types';
import type { Colors } from '../types';

export default abstract class BaseFigure {
  /** Радиус фишки */
  private readonly _radius: number;

  /** Базовый цвет фигуры */
  private readonly _baseColor: Colors;

  /** Координата по оси X */
  private _x: number;

  /** Координата по оси Y */
  private _y: number;

  /** Текущий цвет фигуры */
  private _color: Colors;

  constructor({ x, y, radius, color }: BaseFigureProps) {
    this._x = x;
    this._y = y;
    this._radius = radius;
    this._color = color;
    this._baseColor = color;
  }

  protected get radius() {
    return this._radius;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get color() {
    return this._color;
  }

  get baseColor() {
    return this._baseColor;
  }

  get isEmpty() {
    return this.color === this.baseColor;
  }

  public abstract draw(ctx: CanvasRenderingContext2D): void;

  /**
   * Отрисовка фигуры
   * @param ctx Контекст canvas
   * @param fill Флаг, необходима ли заливка фигуры
   * @param stroke Флаг, необходима ли обводка фигуры
   * @param gradient Флаг, необходим ли градиент при заливке фигуры
   * @param x Координата по оси X
   * @param y Координата по оси Y
   */
  protected drawFigure = (
    ctx: CanvasRenderingContext2D,
    fill = true,
    stroke = true,
    gradient = false,
    x = this._x,
    y = this._y
  ) => {
    ctx.beginPath();
    ctx.arc(x, y, this._radius, 0, 2 * Math.PI);

    if (fill) {
      if (gradient) {
        const gradientStyle = ctx.createRadialGradient(
          x + gradientOffsetX,
          y + gradientOffsetY,
          gradientRadius,
          x,
          y,
          this._radius
        );

        gradientStyle.addColorStop(0, lighterChipColors[this._color as chipColors]);
        gradientStyle.addColorStop(1, this._color);

        ctx.fillStyle = gradientStyle;
      }

      if (!gradient) {
        ctx.fillStyle = this._color;
      }

      ctx.fill();
    }

    if (stroke) {
      ctx.stroke();
    }

    ctx.save();
  };

  /**
   * Установка новых координат положения фигуры
   * @param x Координата по оси X
   * @param y Координата по оси Y
   */
  public setCoordinates = (x: number, y: number) => {
    this._x = x;
    this._y = y;
  };

  /**
   * Заполнение фигуры цветом
   * @param color Цвет для заполнения
   */
  public fill = (color?: Colors) => {
    this._color = color || this._baseColor;
  };

  /** Очищение фигуры от цвета */
  public clear = () => {
    this._color = backgroundColor;
  };

  /**
   * Проверка, что координаты находятся внутри фигуры
   * @param x Координата по оси X
   * @param y Координата по оси Y
   */
  public isCoordinatesInFigure = (x: number, y: number) =>
    (x - this.x) ** 2 + (y - this.y) ** 2 < this.radius ** 2;
}
