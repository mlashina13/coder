import BaseFigure from './BaseFigure';
import { backgroundColor } from '../consts';
import type { RectangleFigureProps } from './types';

export default class ChipSlot extends BaseFigure {
  /** Ширина ячейки */
  private readonly _width: number;

  /** Высота ячейки */
  private readonly _height: number;

  constructor(props: RectangleFigureProps) {
    super(props);

    this._width = props.width;
    this._height = props.height;
  }

  /**
   * Отрисовка фишки
   * @param ctx Контекст canvas
   */
  public draw(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x, this.y, this._width, this._height);

    ctx.fillStyle = this.color || backgroundColor;
    ctx.fillRect(this.x, this.y, this._width, this._height);
  }

  /**
   * Проверка, что координаты находятся внутри ячейки
   * @param x Координата по оси X
   * @param y Координата по оси Y
   */
  public isCoordinatesInFigure(x: number, y: number) {
    return x <= this.x + this._width && x >= this.x && y <= this.y + this._height && y >= this.y;
  }
}
