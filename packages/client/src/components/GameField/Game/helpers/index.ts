import {
  availableColors,
  backgroundColor,
  checkChipRadius,
  chipSize,
  chipColors,
  distanceBetweenChips,
  minute,
  second,
  startX,
  startY,
} from '../consts';
import GameChip from '../Figure/GameChip';
import ChipSlot from '../Figure/ChipSlot';
import CheckChip from '../Figure/CheckChip';
import type { Reference, Colors } from '../types';

/**
 * Генерация эталонной последовательности цветов
 * @param colorsCount Количество цветов в одной строке
 * @param isColorsMayBeRepeated Флаг, показывающий, могут ли повторяться цвета в последовательности
 */
export const generateRandomColorSequence = (
  colorsCount: number,
  isColorsMayBeRepeated: boolean
): Reference => {
  const sequence = [];
  // Используется на 1 цвет больше, чтобы у пользователя была вариация
  const colors = availableColors.slice(0, colorsCount + 1);

  for (let i = 0; i < colorsCount; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomDigit = colors[randomIndex];

    sequence.push(randomDigit);

    if (!isColorsMayBeRepeated) {
      colors.splice(randomIndex, 1);
    }
  }
  console.log(sequence);
  return sequence;
};

/**
 * Расчет новой координаты при перерисовке
 * @param movingFigureCoordinate Координата передвигаемой фигуры
 * @param mouseCoordinate Координата текущего положения мыши
 * @param startMouseCoordinate Координата стартового положения мыши (при начале движения с фигурой)
 */
export const calcNewCoordinate = (
  movingFigureCoordinate: number,
  mouseCoordinate: number,
  startMouseCoordinate?: number
) =>
  startMouseCoordinate
    ? movingFigureCoordinate + mouseCoordinate - startMouseCoordinate
    : movingFigureCoordinate;

/**
 * Получение количества минут и секунд из милисекунд
 * @param ms Количество милисекунд
 */
export const convertMillisecondsToMinutesAndSeconds = (ms: number) => ({
  minutes: Math.floor(ms / minute),
  seconds: Math.floor((ms % minute) / second),
});

/**
 * Генератор координат
 * @param initialX Стартовая координата по оси X
 * @param initialY Стартовая координата по оси Y
 * @param distance Расстояние между координатами
 * @param repeatCount Количество повторений значений x в ряду перед увеличением значения y
 * @param maxCount Максимальное количество координат
 */
function* coordinateGenerator(
  initialX = 0,
  initialY = 0,
  distance = 1,
  repeatCount = 1,
  maxCount = Infinity
): Generator<{ x: number; y: number }> {
  let x = initialX;
  let y = initialY;
  let count = 0;
  let isXCountMin = false;
  let xCount = repeatCount;

  while (count < maxCount) {
    if (repeatCount % 2 !== 0) {
      xCount = isXCountMin ? Math.floor(repeatCount) : Math.ceil(repeatCount);
      isXCountMin = !isXCountMin;
    }

    for (let i = 0; i < xCount; i++) {
      yield { x, y };
      x += distance;
      count += 1;
    }

    y += distance;
    x = initialX;
  }
}

/**
 * Генератор цветов
 * @param colors Массив цветов
 */
function* colorGenerator(colors: chipColors[]): Generator<chipColors> {
  let index = 0;

  while (true) {
    yield colors[index];
    index = (index + 1) % colors.length;
  }
}

/**
 * Формирование списка игровых фишек
 * @param length Количество необходимых игровых фишек
 * @param width Ширина поля, в котором будут расположены координаты
 */
export const createGameChips = (length: number, width: number) => {
  const generateGameChipsCoordinate = coordinateGenerator(
    startX,
    startY,
    (width - length * chipSize) / (length - 1) + chipSize,
    length
  );
  const generateColor = colorGenerator(availableColors);

  return Array.from(
    { length },
    () =>
      new GameChip({
        ...generateGameChipsCoordinate.next().value,
        color: generateColor.next().value,
        width: chipSize,
        height: chipSize,
      })
  );
};

/**
 * Формирование списка ячеек для игровых фишек
 * @param rows Количество строк фишек
 * @param columns Количество фишек в строке
 */
export const createChipSlots = (rows: number, columns: number) => {
  const generateChipCellsCoordinate = coordinateGenerator(
    startX,
    startY * 2 + 50,
    distanceBetweenChips + chipSize,
    columns
  );

  return Array.from({ length: rows }, () =>
    Array.from(
      { length: columns },
      () =>
        new ChipSlot({
          ...generateChipCellsCoordinate.next().value,
          color: backgroundColor,
          width: chipSize,
          height: chipSize,
        })
    )
  );
};

/**
 * Формирование списка фишек с результатами проверки
 * @param rows Количество строк фишек
 * @param columns Количество фишек в строке
 */
export const createCheckChips = (rows: number, columns: number) => {
  const generateCheckChipCoordinate = coordinateGenerator(
    startX + 2 * chipSize * columns + chipSize / 2,
    startY * 2 + 50,
    chipSize,
    columns / 2
  );

  return Array.from({ length: rows }, () =>
    Array.from(
      { length: columns },
      () =>
        new CheckChip({
          ...generateCheckChipCoordinate.next().value,
          color: backgroundColor,
          radius: checkChipRadius,
        })
    )
  );
};
