import { backgroundColor, chipSize } from '../consts';

export default class Field {
  private static _instance: Field | void;

  /** Элемент canvas */
  private readonly _canvas!: HTMLCanvasElement;

  /** Контекст canvas */
  private readonly _ctx!: CanvasRenderingContext2D;

  /** Ширина поля с игровыми фишками */
  private readonly _gameChipsFieldWidth!: number;

  /** Высота поля с игровыми фишками */
  private readonly _gameChipsFieldHeight!: number;

  /** Ширина поля с ячейками */
  private readonly _chipSlotsFieldWidth!: number;

  /** Высота поля с ячейками */
  private readonly _chipSlotsFieldHeight!: number;

  /** Ширина поля с фишками проверки */
  private readonly _checkChipsFieldWidth!: number;

  /** Стартовая координата по оси Y поля с ячейками */
  private readonly _chipSlotsFieldStartY!: number;

  /** Стартовая координата по оси X поля с фишками проверки */
  private readonly _checkChipsFieldStartX!: number;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    colorsCount: number,
    stepsCount: number,
    allAvailableColorsCount: number,
    colorsInRowCount: number,
    maxStepsCount: number
  ) {
    if (Field._instance) {
      return Field._instance;
    }

    this._canvas = canvas;

    this._ctx = ctx;
    this._gameChipsFieldWidth =
      chipSize + 2 * colorsCount * chipSize + chipSize * Math.ceil(colorsCount / 2);
    this._gameChipsFieldHeight = chipSize * 3;
    this._chipSlotsFieldWidth = chipSize * (2 * colorsCount + 1);
    this._chipSlotsFieldHeight = chipSize * (2 * stepsCount + 1);
    this._checkChipsFieldWidth = chipSize * Math.ceil(colorsCount / 2);
    this._chipSlotsFieldStartY = chipSize * 5;
    this._checkChipsFieldStartX = chipSize + this._chipSlotsFieldWidth;

    Field._instance = this;

    this.setFieldSize(allAvailableColorsCount, colorsInRowCount, maxStepsCount);
  }

  public get canvas() {
    return this._canvas;
  }

  public get ctx() {
    return this._ctx;
  }

  public get gameChipsFieldWidth() {
    return this._gameChipsFieldWidth;
  }

  /** Установка размера игрового поля */
  private setFieldSize = (
    allAvailableColorsCount: number,
    colorsInRowCount: number,
    maxStepsCount: number
  ) => {
    this._canvas.width = chipSize * (allAvailableColorsCount * 2 + colorsInRowCount / 2 + 1);
    this._canvas.height = chipSize * (7 + 2 * maxStepsCount);
  };

  /** Отрисовка игрового поля */
  public draw = () => {
    this.fill();
    this.drawChipsField();
    this.drawSlotsField();
    this.drawChecksField();
  };

  /** Заполнение фона */
  private fill = () => {
    this._ctx.fillStyle = backgroundColor;

    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    this._ctx.strokeRect(0, 0, this._canvas.width, this._canvas.height);
  };

  /** Отрисовка поля для игровых фишек */
  private drawChipsField = () => {
    this._ctx.strokeRect(chipSize, chipSize, this._gameChipsFieldWidth, this._gameChipsFieldHeight);
  };

  /** Отрисовка поля для ячеек */
  private drawSlotsField = () => {
    this._ctx.strokeRect(
      chipSize,
      this._chipSlotsFieldStartY,
      this._chipSlotsFieldWidth,
      this._chipSlotsFieldHeight
    );
  };

  /** Отрисовка поля для фишек проверки */
  private drawChecksField = () => {
    this._ctx.strokeRect(
      this._checkChipsFieldStartX,
      this._chipSlotsFieldStartY,
      this._checkChipsFieldWidth,
      this._chipSlotsFieldHeight
    );
  };

  /** Очищение игрового поля */
  public clearGameField = () => {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  };

  /** Деинициализация игрового поля */
  public static destructor = () => {
    Field._instance = undefined;
  };
}
