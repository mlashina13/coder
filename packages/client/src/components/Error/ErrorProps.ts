import { ReactNode } from 'react';

/**
 * Свойства компонента отображения ошибки
 */
export interface ErrorProps {
  /**
   * Текст кнопки действия
   */
  actionText?: string;

  /**
   * Набор css-классов
   */
  className?: string;

  /**
   * Код ошибки
   */
  code?: number;

  /**
   * Описание ошибки
   */
  description?: string | ReactNode;

  /**
   * Иконка
   */
  icon?: ReactNode;

  /**
   * Событие клика по кнопке действия
   */
  onActionClick?: () => void;

  /**
   * Заголовок
   */
  title?: string;
}
