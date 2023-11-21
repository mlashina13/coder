import type { ReactElement } from 'react';

export interface ErrorProps {
  onClick: () => Promise<void> | void;
  icon: ReactElement;
  code: number;
  description: string;
  buttonLabel: string;
}
