import type { chipColors, fieldColors } from '../consts';

interface BaseStatistics {
  isWin: boolean;
  colorsCount?: number;
  stepsCount?: number;
  time?: string;
}

interface WinStatistics extends BaseStatistics {
  isWin: true;
  colorsCount: number;
  stepsCount: number;
  time: string;
}

interface LossStatistics extends BaseStatistics {
  isWin: false;
  colorsCount?: void;
  stepsCount?: void;
  time?: void;
}

export type Statistics = WinStatistics | LossStatistics;

export type Colors = chipColors | fieldColors;

export type Reference = Colors[];

export interface CheckStepResult {
  allMatchCount: number;
  colorMatchCount: number;
}
