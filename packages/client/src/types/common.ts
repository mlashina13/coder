import { ReactNode } from 'react';

/**
 * Свойства компонента иконки
 */
export interface IconProps {
  /**
   * Набор css-классов
   */
  className?: string;

  /**
   * Событие клика
   */
  onClick?: () => void;

  /**
   * Ширина
   */
  width?: string | number;

  /**
   * Высота
   */
  height?: string | number;

  /**
   * Цвет иконки
   */
  color?: string;
}

/**
 * Элемент меню
 */
export interface MenuItem {
  /**
   * Текст элемента
   */
  label: string;

  /**
   * Идентификатор
   */
  id: string;

  /**
   * Иконка
   */
  icon?: ReactNode;
}

/**
 * Описание элемента роутинга
 */
export interface RouteInfo {
  /**
   * Уникальный ключ
   */
  key: string;

  /**
   * Путь (URL)
   */
  path: string;

  /**
   * Отображаемое имя
   */
  displayName: string;

  /**
   * Иконка навигации
   */
  // eslint-disable-next-line no-unused-vars
  renderIconFunction?: (className?: string) => ReactNode;
}

/**
 * Модель топика форума
 */
export interface Topic {
  /**
   * Идентификатор
   */
  id: string;

  /**
   * Тема
   */
  theme: string;

  /**
   * Дата создания топика (date string)
   */
  creationDate: string;

  /**
   * Автор
   */
  creator: string;

  /**
   * Кол-во сообщений
   */
  messagesCount: number;

  /**
   * Кол-во просмотров
   */
  viewsCount: number;
}
