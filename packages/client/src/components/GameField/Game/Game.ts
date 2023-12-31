import { backgroundColor, leftMouseButton, lightX, lightY, maxChipSize } from './consts';
import {
  calcNewCoordinate,
  convertMillisecondsToMinutesAndSeconds,
  createCheckChips,
  createChipSlots,
  createGameChips,
  createLockImages,
  generateRandomColorSequence,
} from './helpers';
import GameChip from './Figure/GameChip';
import ChipSlot from './Figure/ChipSlot';
import CheckChip from './Figure/CheckChip';
import MovingGameChip from './Figure/MovingGameChip';
import Field from './Field/Field';
import Mouse from './Mouse/Mouse';
import GameImage from './GameImage/GameImage';
import type { CheckStepResult, OnEndGameCallback, Reference } from './types';

export default class Game {
  /** Инстанс игры */
  /* eslint-disable */
  private static _instance: Game | void;

  /** Фишка для визуализации перемещения */
  private readonly _movingFigure!: MovingGameChip;

  /** Игровые фишки */
  private readonly _gameChips: GameChip[] = [];

  /** Ячейки, в которые можно переносить фигуры */
  private readonly _chipSlots: ChipSlot[][] = [];

  /** Фишки с результатами проверки */
  private readonly _checkChips: CheckChip[][] = [];

  /** Игровое поле */
  private readonly _field!: Field;

  /** Коллбэк для выполнения после окончания игры */
  private readonly _onGameEnd: OnEndGameCallback | void;

  /** Время запуска игры */
  private _startTime!: Date;

  /** Максимальное количество шагов игры */
  private readonly _maxStepsCount!: number;

  /** Количество цветов в последовательности */
  private readonly _colorsInRowCount!: number;

  /** Общее количество доступных для выбора пользователем цветов */
  private readonly _allAvailableColorsCount!: number;

  /** Флаг, показывающий, могут ли повторяться цвета в последовательности */
  private readonly _isColorsMayBeRepeated!: boolean;

  /** Положение мыши */
  private _mouse = new Mouse();

  /** Индекс передвигаемой в текущий момент фигуры */
  private _movingFigureIndex: number | null = null;

  /** Индекс текущей открытой строки ячеек */
  private _currentChipSlotsRowIndex = 0;

  /** Эталонная последовательность цветов */
  private readonly _reference: Reference = [];

  /** Флаг остановки перерисовки canvas */
  private _isAnimationStopped = false;

  /** Объекты изображений замка */
  private readonly _locksImages: GameImage[] = [];

  /** Размер игровой фишки */
  private readonly _chipSize!: number;

  /** Результат игры */
  private _isWin: boolean | null = null;

  constructor(
    /** Объект canvas */
    canvas: HTMLCanvasElement,
    /** Контекст canvas */
    ctx: CanvasRenderingContext2D,
    /** Доступная высота родительского контейнера */
    containerHeight: number,
    /** Коллбэк для выполнения после окончания игры */
    onGameEnd: OnEndGameCallback | void,
    /** Количество цветов, выбранное пользователем в настройках */
    colorsCount = 5,
    /** Количество ходов, выбранное пользователем в настройках */
    stepsCount = 10,
    /** Флаг, могут ли цвета в эталонной последовательности повторяться, выбранные пользователем в настройках */
    isColorsMayBeRepeated = false
  ) {
    if (Game._instance) {
      return Game._instance;
    }

    /** Заполнение количества ячеек в строке от 4 до 10 */
    this._colorsInRowCount = colorsCount < 5 ? 4 : colorsCount > 11 ? 10 : colorsCount - 1;
    /**
     * Генерация эталонной последовательности на основании количества ячеек в строке и флага,
     * могут ли повторяться цвета
     */
    this._reference = generateRandomColorSequence(this._colorsInRowCount, isColorsMayBeRepeated);
    /** Заполнение количества доступных цветов, на 1 превышает количество ячеек в строке */
    this._allAvailableColorsCount = this._colorsInRowCount + 1;
    /** Заполнение максимального количества ходов от 1 до 20 */
    this._maxStepsCount = stepsCount < 1 ? 1 : stepsCount > 20 ? 20 : stepsCount;
    const chipSize = containerHeight / (6.5 + 1.5 * this._maxStepsCount);
    /**
     * Расчет размера игровой фишки на основании доступной высоты контейнера для игрового поля и
     * максимального количества ходов
     */
    this._chipSize = chipSize > maxChipSize ? maxChipSize : chipSize;
    /** Создание игрового поля */
    this._field = new Field(
      canvas,
      ctx,
      this._chipSize,
      this._colorsInRowCount,
      this._maxStepsCount,
      lightX,
      lightY
    );
    /** Заполнение флага, могут ли повторяться цвета в последовательности */
    this._isColorsMayBeRepeated = isColorsMayBeRepeated;
    /** Установка первой строки ячеек активной */
    this._currentChipSlotsRowIndex = 0;
    /** Сохранение коллбэка для выполнения после окончания игры */
    this._onGameEnd = onGameEnd;
    /** Сохранение времени начала игры */
    this._startTime = new Date();
    /** Создание игровых фишек */
    this._gameChips = createGameChips(
      ctx,
      this._chipSize,
      this._allAvailableColorsCount,
      this._field.gameChipsFieldWidth - 2 * this._chipSize
    );
    /** Создание игровых ячеек */
    this._chipSlots = createChipSlots(ctx, this._chipSize, stepsCount, this._colorsInRowCount);
    /** Создание проверочных фишек */
    this._checkChips = createCheckChips(ctx, this._chipSize, stepsCount, this._colorsInRowCount);
    /** Создание объектов изображений замка */
    this._locksImages = createLockImages(
      this._checkChips,
      this._chipSize,
      this._allAvailableColorsCount
    );
    /** Создание передвигаемой игровой фишки */
    this._movingFigure = new MovingGameChip({
      x: 0,
      y: 0,
      radius: this._chipSize / 2,
      color: backgroundColor,
      lightX,
      lightY,
      ctx,
    });

    /** Сохранение инстанса для резализации синглтона */
    Game._instance = this;

    /** Запуск инициализации игры */
    this.init();
  }

  /** Количество заполненых ячеек в текущей строке */
  private get filledChipSlotsCount() {
    return this._chipSlots[this._currentChipSlotsRowIndex].filter((cell) => !cell.isEmpty).length;
  }

  /** Флаг, заполнены ли все ячейки в текущей строке */
  private get isRowFilled() {
    return this.filledChipSlotsCount === this._colorsInRowCount;
  }

  /** Инициализация игры */
  private init = () => {
    this._field.draw();
    this.drawChips();
    this.addHandlers();
    this.startAnimation();
  };

  /** Отрисовка игрового поля */
  private drawChips = () => {
    this.drawGameChips();
    this.drawChipSlots();
    this.drawCheckChips();
  };

  /** Отрисовка базовых фигур */
  private drawGameChips = () => {
    this._gameChips.forEach((figure) => figure.draw(this._field.ctx));
  };

  /** Отрисовка ячеек для фигур */
  private drawChipSlots = () => {
    this._chipSlots.forEach((row) => row.forEach((cell) => cell.draw(this._field.ctx)));
  };

  /** Отрисовка результатов проверки */
  private drawCheckChips = () => {
    this._checkChips.forEach((row, index) => {
      if (index < this._currentChipSlotsRowIndex) {
        row.forEach((check) => check.draw(this._field.ctx));
      } else {
        if (
          index === this._currentChipSlotsRowIndex &&
          this.isRowFilled &&
          !this._locksImages[index].isActive
        ) {
          this._locksImages[index].activate();
        }

        this._locksImages[index].draw(this._field.ctx);
      }
    });
  };

  /** Запуск анимации */
  private startAnimation() {
    if (!this._isAnimationStopped) {
      requestAnimationFrame(this.tick);
    }
  }

  /** Обновление {@link _canvas} */
  private tick = () => {
    this.startAnimation();

    this.update();
    this.clear();
    this.render();
  };

  /** Добавление обработчиков событий движения мыши */
  private addHandlers = () => {
    this._field.canvas.addEventListener(Mouse.mouseEvents.mousemove, this.mouseMoveHandler);
    this._field.canvas.addEventListener(Mouse.mouseEvents.mousedown, this.mouseDownHandler);
    this._field.canvas.addEventListener(Mouse.mouseEvents.mouseup, this.mouseUpHandler);
    this._field.canvas.addEventListener(Mouse.mouseEvents.dblclick, this.mouseDblClickHandler);
  };

  /** Удаление обработчиков событий движения мыши */
  private clearHandlers = () => {
    this._field.canvas.removeEventListener(Mouse.mouseEvents.mousemove, this.mouseMoveHandler);
    this._field.canvas.removeEventListener(Mouse.mouseEvents.mousedown, this.mouseDownHandler);
    this._field.canvas.removeEventListener(Mouse.mouseEvents.mouseup, this.mouseUpHandler);
    this._field.canvas.removeEventListener(Mouse.mouseEvents.dblclick, this.mouseDblClickHandler);
  };

  /**
   * Обработчик движения мыши
   * @param event Событие мыши mousemove
   */
  private mouseMoveHandler = (event: Event) => {
    const rect = this._field.canvas.getBoundingClientRect();
    const mouseEvent = event as MouseEvent;

    this._mouse.setCoordinates(mouseEvent.clientX - rect.left, mouseEvent.clientY - rect.top);

    if (this._movingFigure.isMoving && !this._mouse.startX && !this._mouse.startY) {
      this._mouse.setStartCoordinates();
    }
  };

  /** Обработчик двойного клика мыши */
  private mouseDblClickHandler = () => {
    if (this.checkSlotClear()) {
      return;
    }

    this.checkRowUnlock();
  };

  /** Проверка, была ли очищена ячейка */
  private checkSlotClear = () => {
    const currentSlot = this._chipSlots[this._currentChipSlotsRowIndex].find((slot) =>
      slot.isCoordinatesInFigure(this._mouse.x, this._mouse.y)
    );

    if (currentSlot) {
      this.checkSlotFilling(currentSlot);
      currentSlot.fill();

      return true;
    }

    return false;
  };

  /** Проверка, была ли нажата иконка для разблокировки результата */
  private checkRowUnlock = () => {
    const isCurrentRowUnlock = this._locksImages[
      this._currentChipSlotsRowIndex
    ].isCoordinatesInImage(this._mouse.x, this._mouse.y);

    if (this._isWin !== null) {
      this._isWin ? this.setWinnings() : this.setLoss();
    }

    if (isCurrentRowUnlock) {
      this.openNewChipSlotsRow();
    }
  };

  /**
   * Обработчик нажатия на кнопку мыши
   * @param event Событие мыши mousedown
   */
  private mouseDownHandler = (event: Event) => {
    const mouseEvent = event as MouseEvent;

    if (mouseEvent.button === leftMouseButton) {
      this._mouse.pressButton();
    }
  };

  /**
   * Обработчик отпускания кнопки мыши
   * @param event Событие мыши mouseup
   */
  private mouseUpHandler = (event: Event) => {
    const mouseEvent = event as MouseEvent;

    if (mouseEvent.button !== leftMouseButton) {
      return;
    }

    this._mouse.upButton();

    if (!this._movingFigure.isMoving) {
      return;
    }

    this.moveGameChip();
    this._mouse.clearStartCoordinates();

    this._movingFigure.fill();
  };

  /** Передвижение игровой фишки */
  private moveGameChip = () => {
    const fillingChipSlot = this._chipSlots[this._currentChipSlotsRowIndex].find((cell) =>
      cell.isCoordinatesInFigure(this._mouse.x, this._mouse.y)
    );

    if (fillingChipSlot) {
      this.moveGameChipToChipSlot(fillingChipSlot);

      return;
    }

    if (this._movingFigureIndex !== null) {
      Game.returnGameChipToStart(this._gameChips[this._movingFigureIndex]);
    }
  };

  /**
   * Проверка, была ли уже заполнена ячейка
   * @param chipSlot Ячейка текущей строки
   */
  private checkSlotFilling = (chipSlot: ChipSlot) => {
    if (chipSlot.isEmpty) {
      return;
    }

    const emptyChip = this._gameChips.find((chip) => chip.baseColor === chipSlot.color);

    if (emptyChip) {
      Game.returnGameChipToStart(emptyChip);
    }
  };

  /**
   * Перенос игровой фишки в ячейку
   * @param chipSlot Ячейка, над которой произошло отпускание кнопки мыши при переносе фишки
   */
  private moveGameChipToChipSlot = (chipSlot: ChipSlot) => {
    this.checkSlotFilling(chipSlot);

    chipSlot.fill(this._movingFigure.color);

    if (!this.isRowFilled) {
      return;
    }

    this.checkGameResult();
    this.fillBaseGameChips();
  };

  /** Проверка результата игры */
  private checkGameResult = () => {
    const { allMatchCount, colorMatchCount } = this.compareRowWithReference();

    if (allMatchCount === this._colorsInRowCount) {
      this._isWin = true;

      return;
    }

    if (this._currentChipSlotsRowIndex === this._maxStepsCount - 1) {
      this._isWin = false;

      return;
    }

    this.fillCheckChips(allMatchCount, colorMatchCount);
  };

  /** Завершение игры победой */
  private setWinnings = () => {
    const { minutes, seconds } = convertMillisecondsToMinutesAndSeconds(
      new Date().getTime() - this._startTime.getTime()
    );

    this._onGameEnd &&
      this._onGameEnd({
        isWin: true,
        colorsCount: this._colorsInRowCount,
        stepsCount: this._currentChipSlotsRowIndex + 1,
        time: `${minutes}:${seconds}`,
      });

    this._isAnimationStopped = true;
  };

  /** Завершение игры проигрышем */
  private setLoss = () => {
    this._onGameEnd && this._onGameEnd({ isWin: false });

    this._isAnimationStopped = true;
  };

  /**
   * Заполнение результатов проверки строки
   * @param allMatchCount Количество фишек, у которых совпало положение и цвет
   * @param colorMatchCount Количество фишек, у которых совпал цвет
   */
  private fillCheckChips = (allMatchCount: number, colorMatchCount: number) => {
    const fillingCheckChip = this._checkChips[this._currentChipSlotsRowIndex];

    let fillingsCheckChipsCount = 0;

    for (let i = 0; i < fillingCheckChip.length; i++) {
      if (i < allMatchCount && fillingsCheckChipsCount < allMatchCount) {
        fillingCheckChip[i].matchColorAndPosition();
        fillingsCheckChipsCount++;

        continue;
      }

      if (i >= allMatchCount && fillingsCheckChipsCount - allMatchCount < colorMatchCount) {
        fillingCheckChip[i].matchColor();
        fillingsCheckChipsCount++;

        continue;
      }

      break;
    }
  };

  /** Сравнение текущей заполненой строки и эталона */
  private compareRowWithReference = (): CheckStepResult => {
    let allMatchCount = 0;
    let colorMatchCount = 0;
    const currentRow = this._chipSlots[this._currentChipSlotsRowIndex];
    const reference = this._reference.slice();

    for (let i = 0; i < this._colorsInRowCount; i++) {
      if (currentRow[i].color === reference[i]) {
        allMatchCount++;
        reference[i] = backgroundColor;
      } else {
        const index = reference.findIndex((color) => color === currentRow[i].color);

        if (index === -1) {
          continue;
        }

        colorMatchCount++;
        reference[index] = backgroundColor;
      }
    }

    return { allMatchCount, colorMatchCount };
  };

  /** Заполнение игровых фигур */
  private fillBaseGameChips = () => {
    this._gameChips.forEach((figure) => figure.fill());
  };

  /** Перемещение на следующую строку ячеек */
  private openNewChipSlotsRow = () => {
    this._currentChipSlotsRowIndex++;
  };

  /** Возвращение фишки в стартовое положение */
  private static returnGameChipToStart = (chip: GameChip) => {
    chip.fill();
  };

  /** Обновление данных для перерисовки */
  private update = () => {
    if (this._mouse.isButtonPressed && !this._mouse.isButtonPressedBefore) {
      this.findMovingGameChip();
    }

    this._mouse.updateButtonPressedFlag();
  };

  /** Поиск передвигаемой фишки */
  private findMovingGameChip = () => {
    for (let i = 0; i < this._allAvailableColorsCount; i++) {
      const figure = this._gameChips[i];

      if (!figure.isMoving && figure.isCoordinatesInFigure(this._mouse.x, this._mouse.y)) {
        this.startMovingGameChip(figure);

        this._movingFigureIndex = i;

        break;
      }
    }
  };

  /**
   * Начало передвижения фишки
   * @param gameChip Передвигаемая фишка
   */
  private startMovingGameChip = (gameChip: GameChip) => {
    this._movingFigure.fill(gameChip.baseColor);
    this._movingFigure.setCoordinates(gameChip.x, gameChip.y);

    if (!this._isColorsMayBeRepeated) {
      gameChip.clear();
    }
  };

  /** Очищение canvas */
  private clear = () => {
    this._field.clear();
    this._field.draw();
    this.drawChips();
  };

  /** Рендер {@link _canvas} с новыми данными */
  private render = () => {
    if (!this._movingFigure.isMoving) {
      return;
    }

    this._movingFigure.setNewCoordinates(
      calcNewCoordinate(this._movingFigure.x, this._mouse.x, this._mouse.startX),
      calcNewCoordinate(this._movingFigure.y, this._mouse.y, this._mouse.startY)
    );
    this._movingFigure.draw(this._field.ctx);
  };

  /** Деинициализация игры */
  public destructor = () => {
    this.clearHandlers();
    Field.destructor();
    Mouse.destructor();

    Game._instance = void 0;
  };

  /** Перерисовка фишек */
  private redrawChips = () => {
    this._gameChips.forEach((chip) => chip.fill());
    this._chipSlots.forEach((row) => row.forEach((slot) => slot.fill()));
    this._checkChips.forEach((row) => row.forEach((chip) => chip.fill()));
  };

  /** Перезапуск анимации */
  private restartAnimation = () => {
    if (!this._isAnimationStopped) {
      return;
    }

    this._isAnimationStopped = false;
    this.startAnimation();
  };

  /**
   * Старт новой игры
   * @param _colorsCount Количество цветов в последовательности
   * @param _stepsCount Максимальное количество ходов
   * @param _isColorsMayBeRepeated Флаг, показывающий, могут ли повторяться цвета в последовательности
   */
  public static start = (
    _colorsCount?: number,
    _stepsCount?: number,
    _isColorsMayBeRepeated?: boolean
  ) => {
    if (!Game._instance) {
      console.warn('Инстанс Game не существует. Необходимо запустить игру с начала');

      return;
    }

    const canvas = Game._instance._field.canvas;
    const ctx = Game._instance._field.ctx;
    const containerHeight = Game._instance._field.canvas.height;
    const onGameEnd = Game._instance._onGameEnd;
    const colorsCount = _colorsCount ?? Game._instance._colorsInRowCount;
    const stepsCount = _stepsCount ?? Game._instance._maxStepsCount;
    const isColorsMayBeRepeated = _isColorsMayBeRepeated ?? Game._instance._isColorsMayBeRepeated;

    Game._instance.destructor();

    Game._instance = new Game(
      canvas,
      ctx,
      containerHeight,
      onGameEnd,
      colorsCount,
      stepsCount,
      isColorsMayBeRepeated
    );
  };

  /** Рестарт текущей игры */
  public static restart = () => {
    if (!Game._instance) {
      console.warn('Инстанс Game не существует. Необходимо запустить игру с начала');

      return;
    }

    Game._instance._movingFigureIndex = null;
    Game._instance._currentChipSlotsRowIndex = 0;

    Game._instance.redrawChips();
    Game._instance.restartAnimation();
  };
}
