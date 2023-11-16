export const enum chipColors {
  red = 'red',
  yellow = 'yellow',
  green = 'green',
  blue = 'blue',
  purple = 'purple',
  orange = 'orange',
  pink = 'pink',
  brown = 'brown',
  gray = 'gray',
  cyan = 'cyan',
  magenta = 'magenta',
}

export const enum fieldColors {
  white = 'white',
  black = 'clack',
  lightSlateGray = 'lightSlateGray',
}

export const availableColors = [
  chipColors.red,
  chipColors.yellow,
  chipColors.green,
  chipColors.blue,
  chipColors.purple,
  chipColors.orange,
  chipColors.pink,
  chipColors.brown,
  chipColors.gray,
  chipColors.cyan,
  chipColors.magenta,
];

export const backgroundColor = 'lightSlateGray' as chipColors;
export const chipSize = 25;
export const checkChipRadius = 5;

export const distanceBetweenChips = 25;

export const leftMouseButton = 0;

export const startX = 50;
export const startY = 50;

const millisecond = 1;
export const second = 1000 * millisecond;
export const minute = 60 * second;
