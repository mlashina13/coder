import type { SetStateAction, Dispatch } from 'react';
import { chipColors, chipSize, leftMouseButton, backgroundColor } from './consts';
import {
  generateRandomColorSequence,
  calcNewCoordinate,
  convertMillisecondsToMinutesAndSeconds,
  createGameChips,
  createChipSlots,
  createCheckChips,
} from './helpers';
import GameChip from './Figure/GameChip';
import ChipSlot from './Figure/ChipSlot';
import CheckChip from './Figure/CheckChip';
import Mouse from './Mouse/Mouse';
import Field from './Field/Field';
import type { CheckStepResult, Reference, Statistics } from './types';

export default class Game {
  /** Инстанс игры */
  /* eslint-disable */
  private static _instance: Game | void;

  /** Фишка для визуализации перемещения */
  private _movingFigure!: GameChip;

  /** Игровые фишки */
  private readonly _gameChips: GameChip[] = [];

  /** Ячейки, в которые можно переносить фигуры */
  private readonly _chipSlots: ChipSlot[][] = [];

  /** Фишки с результатами проверки */
  private readonly _checkChips: CheckChip[][] = [];

  private readonly _field!: Field;

  /** Коллбэк для выполнения после окончания игры */
  private readonly _onGameEnd: Dispatch<SetStateAction<Statistics | null>> | void;

  /** Время запуска игры */
  private readonly _startTime!: Date;

  /** Максимальное количество шагов игры */
  private readonly _maxStepsCount!: number;

  /** Количество цветов в последовательности */
  private readonly _colorsInRowCount!: number;

  /** Общее количество доступных для выбора пользователем цветов */
  private readonly _allAvailableColorsCount!: number;

  /** Положение мыши */
  private _mouse = new Mouse();

  /** Индекс передвигаемой в текущий момент фигуры */
  private _movingFigureIndex: number | null = null;

  /** Индекс текущей открытой строки ячеек */
  private _currentChipSlotsRowIndex = 0;

  /** Эталонная последовательность цветов */
  private _reference: Reference = { used: [], unused: [] };

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    onGameEnd?: Dispatch<SetStateAction<Statistics | null>>,
    colorsCount = 4,
    stepsCount = 10
  ) {
    if (Game._instance) {
      /* eslint-disable */
      return Game._instance;
    }

    this._reference = generateRandomColorSequence(colorsCount);
    // eslint-disable-next-line no-nested-ternary
    this._colorsInRowCount = colorsCount < 4 ? 4 : colorsCount > 10 ? 10 : colorsCount;
    this._allAvailableColorsCount = this._colorsInRowCount + 1;
    // eslint-disable-next-line no-nested-ternary
    this._maxStepsCount = stepsCount < 1 ? 1 : stepsCount > 20 ? 20 : stepsCount;
    this._field = new Field(
      canvas,
      ctx,
      colorsCount,
      stepsCount,
      this._allAvailableColorsCount,
      this._colorsInRowCount,
      this._maxStepsCount
    );
    this._currentChipSlotsRowIndex = 0;
    this._onGameEnd = onGameEnd;
    this._startTime = new Date();
    this._gameChips = createGameChips(
      colorsCount + 1,
      this._field.gameChipsFieldWidth - 2 * chipSize
    );
    this._chipSlots = createChipSlots(stepsCount, colorsCount);
    this._checkChips = createCheckChips(stepsCount, colorsCount);
    this._movingFigure = new GameChip({
      x: 0,
      y: 0,
      width: chipSize,
      height: chipSize,
      color: backgroundColor,
      withoutSlot: true,
    });

    Game._instance = this;

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
    this._checkChips.forEach((row) => row.forEach((check) => check.draw(this._field.ctx)));
  };

  /** Запуск анимации */
  private startAnimation() {
    requestAnimationFrame(this.tick);
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
    const currentSlot = this._chipSlots[this._currentChipSlotsRowIndex].find((slot) =>
      slot.isCoordinatesInFigure(this._mouse.x, this._mouse.y)
    );

    if (currentSlot) {
      this.checkSlotFilling(currentSlot);
      currentSlot.fill();
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
    this.openNewChipSlotsRow();
  };

  /** Проверка результата игры */
  private checkGameResult = () => {
    const { allMatchCount, colorMatchCount } = this.compareRowWithReference();

    if (allMatchCount === this._colorsInRowCount) {
      this.setWinnings();

      return;
    }

    if (this._currentChipSlotsRowIndex === this._maxStepsCount - 1) {
      this.setLoss();

      return;
    }

    this.fillCheckChips(allMatchCount, colorMatchCount);
  };

  /** Завершение игры победой */
  private setWinnings = () => {
    const { minutes, seconds } = convertMillisecondsToMinutesAndSeconds(
      new Date().getTime() - this._startTime.getTime()
    );

    // eslint-disable-next-line no-unused-expressions
    this._onGameEnd &&
      this._onGameEnd({
        isWin: true,
        colorsCount: this._colorsInRowCount,
        stepsCount: this._currentChipSlotsRowIndex + 1,
        time: `${minutes}:${seconds}`,
      });

    this.destructor();
  };

  /** Завершение игры проигрышем */
  private setLoss = () => {
    // eslint-disable-next-line no-unused-expressions
    this._onGameEnd && this._onGameEnd({ isWin: false });

    this.destructor();
  };

  /**
   * Заполнение результатов проверки строки
   * @param allMatchCount Количество фишек, у которых совпало положение и цвет
   * @param colorMatchCount Количество фишек, у которых совпал цвет
   */
  private fillCheckChips = (allMatchCount: number, colorMatchCount: number) => {
    const fillingCheckChip = this._checkChips[this._currentChipSlotsRowIndex];

    for (let i = 0, j = 0; i < allMatchCount || j < colorMatchCount; i++, j++) {
      if (i < allMatchCount) {
        fillingCheckChip[i].matchColorAndPosition();
      }

      if (j < colorMatchCount) {
        fillingCheckChip[this._colorsInRowCount - 1 - j].matchColor();
      }
    }
  };

  /** Сравнение текущей заполненой строки и эталона */
  private compareRowWithReference = (): CheckStepResult => {
    let allMatchCount = 0;
    let colorMatchCount = 0;
    const currentRow = this._chipSlots[this._currentChipSlotsRowIndex];

    for (let i = 0; i < this._colorsInRowCount; i++) {
      if (currentRow[i].color === this._reference.used[i]) {
        allMatchCount++;
      } else if (!this._reference.unused.includes(currentRow[i].color as chipColors)) {
        colorMatchCount++;
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

    gameChip.clear();
  };

  /** Очищение {@link _canvas} */
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

    Game._instance = undefined;
  };
}
