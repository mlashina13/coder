import type { chipColors } from '../../consts';

export interface BaseFigureProps {
  x: number;
  y: number;
  color: chipColors;
}

export interface RectangleFigureProps extends BaseFigureProps {
  width: number;
  height: number;
  withoutSlot?: true;
}

export interface CircleFigureProps extends BaseFigureProps {
  radius: number;
}
