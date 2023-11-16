import { PropsWithChildren, ReactNode } from 'react';

export interface LayoutProps extends PropsWithChildren {
  /**
   * Элемент вспомогательного меню
   */
  subMenu?: ReactNode;

  /**
   * Заголовок страницы
   */
  title?: string;
}
