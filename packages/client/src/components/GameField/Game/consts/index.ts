export const enum chipColors {
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

export const lighterChipColors = {
  [chipColors.red]: '#ff6666',
  [chipColors.yellow]: '#ffff66',
  [chipColors.green]: '#66cc66',
  [chipColors.blue]: '#6666ff',
  [chipColors.purple]: '#cc66cc',
  [chipColors.orange]: '#ffcc66',
  [chipColors.pink]: '#ffe6f2',
  [chipColors.brown]: '#e69999',
  [chipColors.gray]: '#cccccc',
  [chipColors.cyan]: '#99ffff',
  [chipColors.olive]: '#b3b366',
};

export const gradientOffsetX = -3;
export const gradientOffsetY = -2;
export const gradientRadius = 2;

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
  chipColors.olive,
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
