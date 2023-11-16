import { backgroundColor } from '../consts';
import type { BaseFigureProps } from './types';
import type { Colors } from '../types';

export default abstract class BaseFigure {
  /** Базовый цвет фигуры */
  private readonly _baseColor: Colors;

  /** Координата по оси X */
  private _x: number;

  /** Координата по оси Y */
  private _y: number;

  /** Текущий цвет фигуры */
  private _color: Colors;

  protected constructor({ x, y, color }: BaseFigureProps) {
    this._x = x;
    this._y = y;
    this._color = color;
    this._baseColor = color;
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

  public abstract draw(ctx: CanvasRenderingContext2D): void;

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

  get isEmpty() {
    return this.color === this.baseColor;
  }
}
