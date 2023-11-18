import type { MouseEvents } from './types';

export default class Mouse {
  /** События мыши */
  public static readonly mouseEvents: Record<MouseEvents, MouseEvents> = {
    mousemove: 'mousemove',
    mousedown: 'mousedown',
    mouseup: 'mouseup',
    dblclick: 'dblclick',
  };

  /** Инстанс мыши */
  /* eslint-disable */
  private static _instance: Mouse | void;

  /** Положение по оси X */
  private _x = 0;

  /** Положение по оси Y */
  private _y = 0;

  /** Флаг, нажата ли левая кнопка мыши */
  private _isButtonPressed = false;

  /** Флаг, была ли нажата левая кнопка мыши */
  private _isButtonPressedBefore = false;

  /** Стартовое положение по оси X */
  private _startX?: number;

  /** Стартовое положение по оси Y */
  private _startY?: number;

  constructor() {
    if (Mouse._instance) {
      /* eslint-disable */
      return Mouse._instance;
    }

    Mouse._instance = this;
  }

  /** Положение по оси X */
  public get x() {
    return this._x;
  }

  /** Положение по оси Y */
  public get y() {
    return this._y;
  }

  /** Флаг, нажата ли левая кнопка мыши */
  public get isButtonPressed() {
    return this._isButtonPressed;
  }

  /** Флаг, была ли нажата левая кнопка мыши */
  public get isButtonPressedBefore() {
    return this._isButtonPressedBefore;
  }

  /** Стартовое положение по оси X */
  public get startX() {
    return this._startX;
  }

  /** Стартовое положение по оси Y */
  public get startY() {
    return this._startY;
  }

  /** Обновление данных о нажатии мыши */
  public updateButtonPressedFlag() {
    this._isButtonPressedBefore = this._isButtonPressed;
  }

  /** Нажатие кнопки мыши */
  public pressButton() {
    this._isButtonPressed = true;
  }

  /** Поднятие кнопки мыши */
  public upButton() {
    this._isButtonPressed = false;
  }

  /**
   * Установка текущих координат мыши
   * @param x Координата по оси X
   * @param y Координата по оси Y
   */
  public setCoordinates(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  /** Установка стартовых координат мыши */
  public setStartCoordinates() {
    this._startX = this._x;
    this._startY = this._y;
  }

  /** Очищение стартовых координат мыши */
  public clearStartCoordinates() {
    this._startX = undefined;
    this._startY = undefined;
  }

  /** Деинициализация мыши */
  public static destructor = () => {
    Mouse._instance = undefined;
  };
}
