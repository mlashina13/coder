import { PropsWithChildren, ReactNode } from 'react';

export interface DialogProps extends PropsWithChildren {
  /**
   * Компонент действий окна
   */
  actions?: ReactNode;

  /**
   * Событие закрытия окна
   */
  onClose?: () => void;

  /**
   * Открыто ли окно
   */
  open?: boolean;

  /**
   * Заголовок
   */
  title?: string;
}
