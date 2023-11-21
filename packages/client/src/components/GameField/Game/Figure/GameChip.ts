import BaseFigure from './BaseFigure';

export default class GameChip extends BaseFigure {
  /** Флаг, находится ли фишка в движении */
  public get isMoving() {
    return this.color !== this.baseColor;
  }

  /**
   * Отрисовка фишки
   * @param ctx Контекст canvas
   */
  public draw(ctx: CanvasRenderingContext2D) {
    this.drawFigure(ctx, !this.isMoving, true, true, true);
  }
}
