import type { Dispatch, SetStateAction } from 'react';
import type { CHIP_COLORS, CHECK_CHIPS_COLORS } from '../consts';

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

export type Colors = CHIP_COLORS | CHECK_CHIPS_COLORS;

export type Reference = Colors[];

export interface CheckStepResult {
  allMatchCount: number;
  colorMatchCount: number;
}

export type OnEndGameCallback =
  | Dispatch<SetStateAction<Statistics | null>>
  | ((result: Statistics) => void);
