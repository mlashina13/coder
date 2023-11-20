import BaseFigure from './BaseFigure';
import ChipSlot from './ChipSlot';
import type { MovingFigureProps } from './types';

export default class GameChip extends BaseFigure {
  /** Базовый слот для фишки */
  private readonly _slot: ChipSlot | null = null;

  /** Координата X при движении фишки */
  private _newX: number;

  /** Координата Y при движении фишки */
  private _newY: number;

  constructor(props: MovingFigureProps) {
    super(props);

    this._newX = props.x;
    this._newY = props.y;

    if (!props.withoutSlot) {
      this._slot = new ChipSlot(props);
    }
  }

  /** Флаг, находится ли фишка в движении */
  public get isMoving() {
    return this.color !== this.baseColor;
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
    this.drawFigure(ctx, true, false, this._newX, this._newY);

    if (this._slot) {
      this._slot.draw(ctx);
    }
  }
}
