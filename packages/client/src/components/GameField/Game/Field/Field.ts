import { backgroundColor, chipSize, darkBackgroundColor } from '../consts';
import { clearShadow } from '../Figure/helpers';
import { getFieldShadow } from './helpers';

export default class Field {
  /* eslint-disable */
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

  private readonly _shadowBlur!: number;
  private readonly _shadowOffsetX!: number;
  private readonly _shadowOffsetY!: number;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    colorsCount: number,
    stepsCount: number,
    allAvailableColorsCount: number,
    colorsInRowCount: number,
    maxStepsCount: number,
    lightX: number,
    lightY: number
  ) {
    if (Field._instance) {
      /* eslint-disable */
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
    this._chipSlotsFieldStartY = chipSize * 4;
    this._checkChipsFieldStartX = chipSize + this._chipSlotsFieldWidth;

    const { shadowBlur, shadowOffsetX, shadowOffsetY } = getFieldShadow(
      chipSize,
      chipSize,
      lightX,
      lightY,
      this._gameChipsFieldWidth,
      this._gameChipsFieldHeight
    );

    this._shadowBlur = shadowBlur;
    this._shadowOffsetX = shadowOffsetX;
    this._shadowOffsetY = shadowOffsetY;

    Field._instance = this;

    this.setSize(allAvailableColorsCount, colorsInRowCount, maxStepsCount);
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
  private setSize = (
    allAvailableColorsCount: number,
    colorsInRowCount: number,
    maxStepsCount: number
  ) => {
    this._canvas.width = chipSize * (allAvailableColorsCount * 2 + colorsInRowCount / 2 + 1);
    this._canvas.height = chipSize * (6 + 2 * maxStepsCount);
  };

  /** Отрисовка игрового поля */
  public draw = () => {
    this.addShadow();
    this.fill();
    this.drawChipsField();
    this.drawSlotsField();
    this.drawChecksField();
    clearShadow(this._ctx);
  };

  /** Заполнение фона */
  private fill = () => {
    this._ctx.fillStyle = darkBackgroundColor;

    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    this._ctx.strokeRect(0, 0, this._canvas.width, this._canvas.height);
  };

  /** Отрисовка поля для игровых фишек */
  private drawChipsField = () => {
    this._ctx.fillStyle = backgroundColor;
    this._ctx.strokeStyle = darkBackgroundColor;

    this._ctx.fillRect(chipSize, chipSize, this._gameChipsFieldWidth, this._gameChipsFieldHeight);
    this._ctx.strokeRect(chipSize, chipSize, this._gameChipsFieldWidth, this._gameChipsFieldHeight);
  };

  /** Отрисовка поля для ячеек */
  private drawSlotsField = () => {
    this._ctx.fillRect(
      chipSize,
      this._chipSlotsFieldStartY,
      this._chipSlotsFieldWidth,
      this._chipSlotsFieldHeight
    );
    this._ctx.strokeRect(
      chipSize,
      this._chipSlotsFieldStartY,
      this._chipSlotsFieldWidth,
      this._chipSlotsFieldHeight
    );
  };

  /** Отрисовка поля для фишек проверки */
  private drawChecksField = () => {
    this._ctx.fillRect(
      this._checkChipsFieldStartX,
      this._chipSlotsFieldStartY,
      this._checkChipsFieldWidth,
      this._chipSlotsFieldHeight
    );
    this._ctx.strokeRect(
      this._checkChipsFieldStartX,
      this._chipSlotsFieldStartY,
      this._checkChipsFieldWidth,
      this._chipSlotsFieldHeight
    );
  };

  /** Добавление тени к игровому полю */
  private addShadow = () => {
    this._ctx.shadowBlur = this._shadowBlur;
    this._ctx.shadowOffsetX = this._shadowOffsetX;
    this._ctx.shadowOffsetY = this._shadowOffsetY;
  };

  /** Очищение игрового поля */
  public clear = () => {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  };

  /** Деинициализация игрового поля */
  public static destructor = () => {
    Field._instance = void 0;
  };
}
