import { Comment, TopicMessage } from '../../types/common';

/**
 * Свойства компонента списка сообщений топика
 */
export interface TopicMessagesListProps {
  /**
   * Общее кол-во топиков
   */
  messagesCount: number;

  /**
   * Топиков на странице
   */
  messagesPerPage: number;

  /**
   * Список топиков
   */
  messages: Comment[];

  /**
   * Событие смены страницы
   */
  onPageChange: (newPage: number) => void;

  /**
   * Тема
   */
  theme: string;

  /**
   * css-стили
   */
  className?: string;

  /**
   * Кол-во просмотров темы
   */
  themeViewsCount?: number;

  /**
   * Событие удаления сообщения
   */
  onDeleteMessage?: (id: number) => void;

  /**
   * Событие изменения сообщения
   */
  onEditMessage?: (id: number) => void;
}
