export default class GameImage extends Image {
  /** Координата по оси X */
  private readonly _x: number;

  /** Координата по оси Y */
  private readonly _y: number;

  /** Активно ли изображение */
  private _isActive = false;

  /** Размер изображения */
  private readonly _chipSize: number;

  constructor(
    startX: number,
    endX: number,
    y: number,
    chipSize: number,
    availableColorsCount: number
  ) {
    super();

    const dx = availableColorsCount % 2 !== 0 ? chipSize / 2 : 0;
    this._x = (startX + endX) / 2 - dx;
    this._y = y;
    this._chipSize = chipSize;

    this.deactivate();
  }

  public get isActive() {
    return this._isActive;
  }

  public activate = () => {
    this.src = '/src/assets/img/red-lock-512.png';
    this._isActive = true;
  };

  public deactivate = () => {
    this.src = '/src/assets/img/lock-512.png';
    this._isActive = false;
  };

  public draw = (ctx: CanvasRenderingContext2D) => {
    ctx.drawImage(this, this._x, this._y, this._chipSize, this._chipSize);
  };

  /**
   * Проверка, что координаты находятся внутри изображения
   * @param x Координата по оси X
   * @param y Координата по оси Y
   */
  public isCoordinatesInImage = (x: number, y: number) =>
    this._isActive &&
    x >= this._x &&
    x <= this._x + this._chipSize &&
    y >= this._y &&
    y <= this._y + this._chipSize;
}
