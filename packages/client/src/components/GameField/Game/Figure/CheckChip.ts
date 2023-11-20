import BaseFigure from './BaseFigure';
import { chipColors } from '../consts';

export default class CheckChip extends BaseFigure {
  /** Цвет фишки, если она отображает верное расположение и цвет игровой фишки */
  private readonly _allMatchColor = 'black' as chipColors;

  /** Цвет фишки, если она отображает верный цвет игровой фишки */
  private readonly _colorMatchColor = 'white' as chipColors;

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
  public draw = (ctx: CanvasRenderingContext2D) => {
    this.drawFigure(ctx, !!this.color);
  };
}
