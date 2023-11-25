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

export const backgroundColor = '#9e9c9c' as chipColors;
export const shadowInnerColor = '#858383' as chipColors;
export const shadowOuterColor = '#251717' as chipColors;
export const darkBackgroundColor = '#525252' as chipColors;

export const lighterChipColors = {
  [chipColors.red]: '#ff6666',
  [chipColors.yellow]: '#ffff66',
  [chipColors.green]: '#66cc66',
  [chipColors.blue]: '#6666ff',
  [chipColors.purple]: '#cc66cc',
  [chipColors.orange]: '#ffcc66',
  [chipColors.pink]: '#F19EB5',
  [chipColors.brown]: '#e69999',
  [chipColors.gray]: '#cccccc',
  [chipColors.cyan]: '#99ffff',
  [chipColors.olive]: '#b3b366',
  [backgroundColor]: '#c9c7c7',
  [shadowInnerColor]: backgroundColor,
};

export const gradientOffsetX = 5;
export const gradientOffsetY = 7;
export const gradientRadius = 3;

export const enum fieldColors {
  white = '#ffffff',
  black = '#000000',
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

export const chipSize = 30;
export const checkChipRadius = 8;
export const distanceBetweenChips = chipSize;
export const leftMouseButton = 0;
export const startX = 2 * chipSize;
export const startY = 2 * chipSize;

const millisecond = 1;
export const second = 1000 * millisecond;
export const minute = 60 * second;
