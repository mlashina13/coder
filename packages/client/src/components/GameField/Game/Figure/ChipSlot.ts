import BaseFigure from './BaseFigure';

export default class ChipSlot extends BaseFigure {
  /** Флаг, заполнена ли ячейка */
  private get isFilled() {
    return this.color !== this.baseColor;
  }

  /**
   * Отрисовка фишки
   * @param ctx Контекст canvas
   */
  public draw(ctx: CanvasRenderingContext2D) {
    this.drawFigure(ctx, this.isFilled, true, true, this.isFilled);
  }
}
