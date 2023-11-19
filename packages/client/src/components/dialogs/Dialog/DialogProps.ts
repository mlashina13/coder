import { PropsWithChildren, ReactNode } from 'react';

export interface DialogProps extends PropsWithChildren {
  /**
   * Компонент действий окна
   */
  actions?: ReactNode;

  /**
   * Набор css-классов
   */
  className?: string;

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
