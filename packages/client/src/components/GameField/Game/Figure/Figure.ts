import {
  chipColors,
  backgroundColor,
  lighterChipColors,
  gradientOffsetX,
  gradientOffsetY,
  gradientRadius,
  shadowInnerColor,
  shadowOuterColor,
} from '../consts';
import { calcNormalizedVectors, clearShadow } from './helpers';
import type { BaseFigureProps, FigureTypes } from './types';
import type { Colors } from '../types';

export default abstract class Figure {
  public static readonly types: Record<FigureTypes, FigureTypes> = {
    /** Плоская фигура */
    flat: 'flat',
    /** Вогнутая фигура */
    concave: 'concave',
    /** Выпуклая фигура */
    convex: 'convex',
  };

  /** Кооордината источника света по оси X */
  private readonly _lightX!: number;

  /** Кооордината источника света по оси Y */
  private readonly _lightY!: number;

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

  constructor({ x, y, radius, color, lightX, lightY }: BaseFigureProps) {
    this._x = x;
    this._y = y;
    this._radius = radius;
    this._color = color;
    this._baseColor = color;
    this._lightX = lightX;
    this._lightY = lightY;
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
   * @param type Тип фигуры
   * @param x Координата по оси X
   * @param y Координата по оси Y
   */
  protected drawFigure = (
    ctx: CanvasRenderingContext2D,
    type: FigureTypes,
    x = this._x,
    y = this._y
  ) => {
    ctx.beginPath();
    ctx.arc(x, y, this._radius, 0, 2 * Math.PI);

    if (type === Figure.types.flat) {
      this.drawFlat(ctx);
    }

    if (type === Figure.types.concave) {
      this.drawConcave(ctx, x, y);
    }

    if (type === Figure.types.convex) {
      this.drawConvex(ctx, x, y);
    }

    ctx.save();
  };

  /**
   * Отрисовка плоской фигуры
   * @param ctx Контекст canvas
   */
  private drawFlat = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = this._color;
    ctx.strokeStyle = this._color === backgroundColor ? shadowInnerColor : shadowOuterColor;

    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };

  /**
   * Отрисовка вогнутой фигуры
   * @param ctx Контекст canvas
   * @param x Координата по оси X
   * @param y Координата по оси Y
   */
  private drawConcave = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    this.addInnerShadow(ctx, x, y);

    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };

  /**
   * Отрисовка выпуклой фигуры
   * @param ctx Контекст canvas
   * @param x Координата по оси X
   * @param y Координата по оси Y
   */
  private drawConvex = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = this.createGradient(ctx, x, y);

    this.addOuterShadow(ctx, x, y);
    ctx.fill();
    clearShadow(ctx);
  };

  /**
   * Добавление внутренней тени
   * @param ctx Контекст canvas
   * @param x Координата по оси X
   * @param y Координата по оси Y
   */
  private addInnerShadow = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const { shadowX, shadowY } = this.calcShadowCoordinates(x, y);

    ctx.fillStyle = this.createGradient(ctx, shadowX, shadowY, true);
    ctx.strokeStyle = shadowInnerColor;
  };

  /**
   * Вычисление координат блика на фигуре
   * @param x Координата по оси X
   * @param y Координата по оси Y
   */
  private calcShadowCoordinates = (x: number, y: number) => {
    const vectors = this.calcVectors(x, y, true);

    const { normalizedVectorX, normalizedVectorY } = calcNormalizedVectors(vectors);

    return {
      shadowX: x + normalizedVectorX * gradientOffsetX,
      shadowY: y + normalizedVectorY * gradientOffsetY,
    };
  };

  /**
   * Создание градиента
   * @param ctx Контекст canvas
   * @param x Координата по оси X
   * @param y Координата по оси Y
   * @param isShadow Флаг, нужно ли рисовать тень
   */
  private createGradient = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    isShadow = false
  ) => {
    const { shineX, shineY } = this.calcShineCoordinates(x, y);

    const gradientStyle = ctx.createRadialGradient(
      shineX,
      shineY,
      gradientRadius,
      x,
      y,
      this._radius
    );

    const color = isShadow ? shadowInnerColor : this._color;

    gradientStyle.addColorStop(0, lighterChipColors[color as chipColors]);
    gradientStyle.addColorStop(1, color);

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
      shineX: x + normalizedVectorX * (this._radius - gradientOffsetX),
      shineY: y + normalizedVectorY * (this._radius - gradientOffsetY),
    };
  };

  /**
   * Расчет вектора от точки до источника света
   * @param x Координата по оси X
   * @param y Координата по оси Y
   * @param isInner Флаг для определения направления вектора
   */
  private calcVectors = (x: number, y: number, isInner = false) => ({
    vectorX: isInner ? x - this._lightX : this._lightX - x,
    vectorY: isInner ? y - this._lightY : this._lightY - y,
  });

  /**
   * Установка параметров тени
   * @param ctx Контекст canvas
   * @param x Координата по оси X
   * @param y Координата по оси Y
   */
  private addOuterShadow = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const angleRadians = Math.atan2(y - this._lightY, x - this._lightX);
    const distanceToLight = Math.sqrt((this._lightX - x) ** 2 + (this._lightY - y) ** 2);

    ctx.shadowColor = shadowOuterColor;
    ctx.shadowBlur = Math.min(gradientRadius, distanceToLight / (5 * gradientRadius));
    ctx.shadowOffsetX = Math.cos(angleRadians) * gradientOffsetX;
    ctx.shadowOffsetY = Math.sin(angleRadians) * gradientOffsetY;
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
