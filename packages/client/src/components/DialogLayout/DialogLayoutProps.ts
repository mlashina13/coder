import { PropsWithChildren } from 'react';

/**
 * Свойства компонента layout'а страниц-диалогов
 */
export interface DialogLayoutProps extends PropsWithChildren {
  /**
   * Набор css-классов
   */
  className?: string;

  /**
   * Набор css-классов для шапки
   */
  headerClassName?: string;

  /**
   * Набор css-классов для контента
   */
  contentClassName?: string;
}
