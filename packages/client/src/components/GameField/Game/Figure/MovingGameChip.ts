import GameChip from './GameChip';
import Figure from './Figure';
import type { BaseFigureProps } from './types';

export default class MovingGameChip extends GameChip {
  /** Координата X при движении фишки */
  private _newX: number;

  /** Координата Y при движении фишки */
  private _newY: number;

  constructor(props: BaseFigureProps) {
    super(props);

    this._newX = props.x;
    this._newY = props.y;
  }

  /**
   * Установка новых координат при движении фигуры
   * @param x Координата по оси X
   * @param y Координата по оси Y
   */
  public setNewCoordinates(x: number, y: number) {
    this._newX = x;
    this._newY = y;
  }

  /**
   * Отрисовка фишки
   * @param ctx Контекст canvas
   */
  public draw(ctx: CanvasRenderingContext2D) {
    this.drawFigure(ctx, Figure.types.convex, this._newX, this._newY);
  }
}
