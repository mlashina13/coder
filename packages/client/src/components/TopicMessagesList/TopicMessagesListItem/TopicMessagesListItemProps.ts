import { Comment } from '../../../types/common';

/**
 * Свойства компонента элемента списка сообщений топика
 */
export interface TopicMessagesListItemProps extends Comment {
  /**
   * Событие изменения сообщения
   */
  onEdit?: (id: number) => void;

  /**
   * Событие удаления сообщения
   */
  onDelete?: (id: number) => void;
}
