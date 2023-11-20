import BaseFigure from './BaseFigure';

export default class ChipSlot extends BaseFigure {
  /**
   * Отрисовка фишки
   * @param ctx Контекст canvas
   */
  public draw(ctx: CanvasRenderingContext2D) {
    this.drawFigure(ctx);
  }
}
