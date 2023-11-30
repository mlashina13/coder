import { backgroundColor, darkBackgroundColor } from '../consts';
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

  /** Степень размытия тени */
  private readonly _shadowBlur!: number;

  /** Смещение тени по оси X */
  private readonly _shadowOffsetX!: number;

  /** Смещение тени по оси Y */
  private readonly _shadowOffsetY!: number;

  /** Размер игровой фишки */
  private readonly _chipSize!: number;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    chipSize: number,
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
    this._chipSize = chipSize;
    this._ctx = ctx;
    this._gameChipsFieldHeight = chipSize * 3;
    this._chipSlotsFieldWidth = 1.5 * chipSize * (colorsInRowCount + 1);
    this._chipSlotsFieldHeight = 1.5 * this._chipSize * (1 + maxStepsCount);
    this._checkChipsFieldWidth = chipSize * Math.ceil(colorsInRowCount / 2) + chipSize;
    this._gameChipsFieldWidth = this._chipSlotsFieldWidth + this._checkChipsFieldWidth;
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

    this.setSize(maxStepsCount);
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
  private setSize = (maxStepsCount: number) => {
    this._canvas.width = this._gameChipsFieldWidth + 2 * this._chipSize;
    this._canvas.height = this._chipSize * (6.5 + 1.5 * maxStepsCount);
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

    this._ctx.fillRect(
      this._chipSize,
      this._chipSize,
      this._gameChipsFieldWidth,
      this._gameChipsFieldHeight
    );
    this._ctx.strokeRect(
      this._chipSize,
      this._chipSize,
      this._gameChipsFieldWidth,
      this._gameChipsFieldHeight
    );
  };

  /** Отрисовка поля для ячеек */
  private drawSlotsField = () => {
    this._ctx.fillRect(
      this._chipSize,
      this._chipSlotsFieldStartY,
      this._chipSlotsFieldWidth,
      this._chipSlotsFieldHeight
    );
    this._ctx.strokeRect(
      this._chipSize,
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
