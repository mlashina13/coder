import type { CHIP_COLORS } from '../../consts';

export interface BaseFigureProps {
  x: number;
  y: number;
  color: CHIP_COLORS;
  radius: number;
  lightX: number;
  lightY: number;
  ctx: CanvasRenderingContext2D;
}

export type FigureTypes = 'flat' | 'concave' | 'convex';
