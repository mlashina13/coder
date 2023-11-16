import BaseFigure from './BaseFigure';
import ChipSlot from './ChipSlot';
import type { RectangleFigureProps } from './types';

export default class GameChip extends BaseFigure {
  /** Ширина фишки */
  private readonly _width: number;

  /** Длина фишки */
  private readonly _height: number;

  /** Базовый слот для фишки */
  private readonly _slot: ChipSlot | null = null;

  /** Координата X при движении фишки */
  private _newX: number;

  /** Координата Y при движении фишки */
  private _newY: number;

  constructor(props: RectangleFigureProps) {
    super(props);

    this._width = props.width;
    this._height = props.height;

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
    if (this._slot) {
      this._slot.draw(ctx);
    }

    ctx.beginPath();

    ctx.fillStyle = this.color;
    ctx.fillRect(this._newX, this._newY, this._width, this._height);

    ctx.save();
  }

  /**
   * Проверка, что координаты находятся внутри фишки
   * @param x Координата по оси X
   * @param y Координата по оси Y
   */
  public isCoordinatesInFigure(x: number, y: number) {
    return x <= this.x + this._width && x >= this.x && y <= this.y + this._height && y >= this.y;
  }
}
