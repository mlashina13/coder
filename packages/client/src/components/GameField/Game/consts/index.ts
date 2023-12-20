/** Типы игры */
export enum GAME_TYPES {
  /** Игра без повторения цветов в эталонной последовательности */
  withoutColorsRepeated = '1',
  /** Игра с возможным повторением цветов в эталонной последовательности */
  withColorsRepeated = '2',
}

/** Значения используемых в игре цветов для фишек */
export const enum CHIP_COLORS {
  red = '#7b001c',
  yellow = '#fedd00',
  green = '#0f3325',
  blue = '#191970',
  purple = '#4b0082',
  orange = '#ff8c00',
  pink = '#c71585',
  brown = '#800000',
  gray = '#696969',
  cyan = '#008080',
  olive = '#556b2F',
}

/** Основной фоновый цвет */
export const backgroundColor = '#9e9c9c' as CHIP_COLORS;
/** Цвет для внутренней тени */
export const shadowInnerColor = '#858383' as CHIP_COLORS;
/** Цвет для внешней тени */
export const shadowOuterColor = '#251717' as CHIP_COLORS;
/** Затемненный фоновый цвет */
export const darkBackgroundColor = '#525252' as CHIP_COLORS;

/** Цвета для создания градиента внутри фишек */
export const lighterChipColors = {
  [CHIP_COLORS.red]: '#ff6666',
  [CHIP_COLORS.yellow]: '#ffff66',
  [CHIP_COLORS.green]: '#66cc66',
  [CHIP_COLORS.blue]: '#6666ff',
  [CHIP_COLORS.purple]: '#cc66cc',
  [CHIP_COLORS.orange]: '#ffcc66',
  [CHIP_COLORS.pink]: '#F19EB5',
  [CHIP_COLORS.brown]: '#e69999',
  [CHIP_COLORS.gray]: '#cccccc',
  [CHIP_COLORS.cyan]: '#99ffff',
  [CHIP_COLORS.olive]: '#b3b366',
  [backgroundColor]: '#c9c7c7',
  [shadowInnerColor]: backgroundColor,
};

/** Координата источника света по оси X */
export const lightX = -100;
/** Координата источника света по оси Y */
export const lightY = -200;
/** Смещение тени по оси X */
export const gradientOffsetX = 5;
/** Смещение тени по оси Y */
export const gradientOffsetY = 7;
/** Радиус градиента */
export const gradientRadius = 3;

/** Цвета проверочных фишек */
export const enum CHECK_CHIPS_COLORS {
  white = '#ffffff',
  black = '#000000',
}

/** Массив доступных в игре цветов фишек. Из этого массива формируется эталонная последовательность цветов */
export const availableColors = [
  CHIP_COLORS.red,
  CHIP_COLORS.yellow,
  CHIP_COLORS.green,
  CHIP_COLORS.blue,
  CHIP_COLORS.purple,
  CHIP_COLORS.orange,
  CHIP_COLORS.pink,
  CHIP_COLORS.brown,
  CHIP_COLORS.gray,
  CHIP_COLORS.cyan,
  CHIP_COLORS.olive,
];
export const leftMouseButton = 0;

/** Милисекунда */
const millisecond = 1;
/** Секунда */
export const second = 1000 * millisecond;
/** Минута */
export const minute = 60 * second;

export const maxChipSize = 50;
