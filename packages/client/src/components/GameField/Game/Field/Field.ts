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
    /** Объект canvas */
    canvas: HTMLCanvasElement,
    /** Контекст canvas */
    ctx: CanvasRenderingContext2D,
    /** Размер игровой фишки */
    chipSize: number,
    /** Количество цветов в последовательности */
    colorsInRowCount: number,
    /** Максимальное количество ходов */
    maxStepsCount: number,
    /** Координата источника освещения по оси X */
    lightX: number,
    /** Координата источника освещения по оси Y */
    lightY: number
  ) {
    if (Field._instance) {
      /* eslint-disable */
      return Field._instance;
    }

    this._canvas = canvas;
    this._chipSize = chipSize;
    this._ctx = ctx;
    /**
     * Высота поля с игровыми фишками определяется как высота 3-х фишек:
     * 2 для отступа и 1 для отрисовки самих фишек
     */
    this._gameChipsFieldHeight = chipSize * 3;
    /**
     * Ширина поля с игровыми ячейками определяется как количество ячеек в строке + 1,
     * и это умножается на полтора размера ячейки. По этой формуле получается задать ширину поля,
     * соответствующую тому, что справа и слева от ячеек до края поля будет отступ по размеру ячейки,
     * а между ячейками (в ширину) будет расстояние в половину размера ячейки
     */
    this._chipSlotsFieldWidth = 1.5 * chipSize * (colorsInRowCount + 1);
    /**
     * Высота поля с игровыми ячейками определяется как максимальное количество шагов + 1,
     * и это умножается на полтора размера ячейки. По этой формуле получается задать высоту поля,
     * соответствующую тому, что сверху и снизу от ячеек до края поля будет отступ по размеру ячейки,
     * а между ячейками (в высоту) будет расстояние в половину размера ячейки
     */
    this._chipSlotsFieldHeight = 1.5 * this._chipSize * (maxStepsCount + 1);
    /**
     * Ширина поля с проверочными фишками определяется как половина от количества ячеек в строке
     * + 1, и это умножается на размер игровой фишки. Половина от количества ячеек округляется в
     * большую сторону – это позволяет рассчитать, сколько максимум проверочных фишек будет в одном
     * из двух рядов. По этой формуле получается задать ширину поля, соответствующую тому, что
     * справа и слева от проверочных фишек до края поля будет отступ по размеру игровой фишки, а
     * расстояния между центрами окружностей (в ширину) проверочных фишек будут соответствовать
     * размеру игровой фишки
     */
    this._checkChipsFieldWidth = chipSize * (Math.ceil(colorsInRowCount / 2) + 1);
    /**
     * Ширина поля с игровыми фишками определяется как сумма ширин поля с игровыми ячейками и поля
     * с проверочными фишками. Расстояние (в ширину) между игровыми фишками определяется в
     * зависимости от количества доступных цветов (фишек) и ширины поля.
     */
    this._gameChipsFieldWidth = this._chipSlotsFieldWidth + this._checkChipsFieldWidth;
    /**
     * Координата верхней границы поля с игровыми ячейками по оси Y определяется как высота поля с
     * игровыми фишками + размер игровой ячейки в качестве отступа от границы поля.
     */
    this._chipSlotsFieldStartY = this._gameChipsFieldHeight + chipSize;
    /**
     * Координата левой границы поля с проверочными фишками по оси X определяется как ширина поля с
     * игровыми ячейками + размер игровой ячейки в качестве отступа от границы поля.
     */
    this._checkChipsFieldStartX = this._chipSlotsFieldWidth + chipSize;

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
