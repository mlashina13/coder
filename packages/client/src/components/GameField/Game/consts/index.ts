export enum GAME_TYPES {
  withoutColorsRepeated = '1',
  withColorsRepeated = '2',
}

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

export const backgroundColor = '#9e9c9c' as CHIP_COLORS;
export const shadowInnerColor = '#858383' as CHIP_COLORS;
export const shadowOuterColor = '#251717' as CHIP_COLORS;
export const darkBackgroundColor = '#525252' as CHIP_COLORS;

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

export const lightX = -100;
export const lightY = -200;
export const gradientOffsetX = 5;
export const gradientOffsetY = 7;
export const gradientRadius = 3;

export const enum CHECK_CHIPS_COLORS {
  white = '#ffffff',
  black = '#000000',
}

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

export const chipSize = 30;
export const checkChipRadius = 8;
export const distanceBetweenChips = chipSize;
export const leftMouseButton = 0;
export const startX = 2 * chipSize;
export const startY = 2 * chipSize;

const millisecond = 1;
export const second = 1000 * millisecond;
export const minute = 60 * second;
