import BaseFigure from './BaseFigure';
import { chipColors } from '../consts';
import type { CircleFigureProps } from './types';

export default class CheckChip extends BaseFigure {
  /** Радиус фишки */
  private readonly _radius: number;

  /** Цвет фишки, если она отображает верное расположение и цвет игровой фишки */
  private readonly _allMatchColor = 'black' as chipColors;

  /** Цвет фишки, если она отображает верный цвет игровой фишки */
  private readonly _colorMatchColor = 'white' as chipColors;

  constructor(props: CircleFigureProps) {
    super(props);

    this._radius = props.radius;
  }

  /** Пометка фишки, отображающей верный цвет игровой фишки */
  public matchColor() {
    this.fill(this._colorMatchColor);
  }

  /** Пометка фишки, отображающей верное расположение и цвет игровой фишки */
  public matchColorAndPosition() {
    this.fill(this._allMatchColor);
  }

  /**
   * Отрисовка фишки
   * @param ctx Контекст canvas
   */
  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this._radius, 0, 2 * Math.PI);
    ctx?.stroke();
    ctx?.save();

    if (!this.color) {
      return;
    }

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this._radius, 0, 2 * Math.PI);
    ctx?.fill();
    ctx?.save();
  }
}
