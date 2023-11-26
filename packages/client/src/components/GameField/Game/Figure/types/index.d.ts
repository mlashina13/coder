import type { chipColors } from '../../consts';

export interface BaseFigureProps {
  x: number;
  y: number;
  color: chipColors;
  radius: number;
  lightX: number;
  lightY: number;
}

export type FigureTypes = 'flat' | 'concave' | 'convex';
