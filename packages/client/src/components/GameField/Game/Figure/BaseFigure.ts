import {
  backgroundColor,
  chipColors,
  lighterChipColors,
  gradientOffsetX,
  gradientOffsetY,
  gradientRadius,
} from '../consts';
import { calcNormalizedVectors, clearShadow } from './helpers';
import type { BaseFigureProps } from './types';
import type { Colors } from '../types';

export default abstract class BaseFigure {
  /** Кооордината источника света по оси X */
  private readonly _lightX = -100;

  /** Кооордината источника света по оси Y */
  private readonly _lightY = -200;

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
   * @param shadow Флаг, необходима ли тень
   * @param x Координата по оси X
   * @param y Координата по оси Y
   */
  protected drawFigure = (
    ctx: CanvasRenderingContext2D,
    fill = true,
    stroke = true,
    gradient = false,
    shadow = false,
    x = this._x,
    y = this._y
  ) => {
    ctx.beginPath();
    ctx.arc(x, y, this._radius, 0, 2 * Math.PI);

    if (fill) {
      ctx.fillStyle = gradient ? this.createGradient(ctx, x, y) : this._color;

      if (shadow) {
        this.addShadow(ctx, x, y);
      }

      ctx.fill();

      if (shadow) {
        clearShadow(ctx);
      }
    }

    if (stroke) {
      ctx.stroke();
    }

    ctx.save();
  };

  /**
   * Создание градиента
   * @param ctx Контекст canvas
   * @param x Координата по оси X
   * @param y Координата по оси Y
   */
  private createGradient = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const { shineX, shineY } = this.calcShineCoordinates(x, y);

    const gradientStyle = ctx.createRadialGradient(
      shineX,
      shineY,
      gradientRadius,
      x,
      y,
      this._radius
    );

    gradientStyle.addColorStop(0, lighterChipColors[this._color as chipColors]);
    gradientStyle.addColorStop(1, this._color);

    return gradientStyle;
  };

  /**
   * Вычисление координат блика на фигуре
   * @param x Координата по оси X
   * @param y Координата по оси Y
   */
  private calcShineCoordinates = (x: number, y: number) => {
    const vectors = this.calcVectors(x, y);

    const { normalizedVectorX, normalizedVectorY } = calcNormalizedVectors(vectors);

    return {
      shineX: x + normalizedVectorX * (this._radius + gradientOffsetX),
      shineY: y + normalizedVectorY * (this._radius + gradientOffsetY),
    };
  };

  /**
   * Расчет вектора от точки до источника света
   * @param x Координата по оси X
   * @param y Координата по оси Y
   */
  private calcVectors = (x: number, y: number) => ({
    vectorX: this._lightX - x,
    vectorY: this._lightY - y,
  });

  /**
   * Установка параметров тени
   * @param ctx Контекст canvas
   * @param x Координата по оси X
   * @param y Координата по оси Y
   */
  private addShadow = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const angleRadians = Math.atan2(y - this._lightY, x - this._lightX);
    const distanceToLight = Math.sqrt((this._lightX - x) ** 2 + (this._lightY - y) ** 2);

    ctx.shadowColor = 'black';
    ctx.shadowBlur = Math.min(5, distanceToLight / 5);
    ctx.shadowOffsetX = Math.cos(angleRadians) * 10;
    ctx.shadowOffsetY = Math.sin(angleRadians) * 5;
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
