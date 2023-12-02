import Figure from './Figure';

export default class ChipSlot extends Figure {
  /** Флаг, заполнена ли ячейка */
  private get isFilled() {
    return this.color !== this.baseColor;
  }

  /**
   * Отрисовка фишки
   * @param ctx Контекст canvas
   */
  public draw(ctx: CanvasRenderingContext2D) {
    this.drawFigure(ctx, this.isFilled ? Figure.types.convex : Figure.types.concave);
  }
}
