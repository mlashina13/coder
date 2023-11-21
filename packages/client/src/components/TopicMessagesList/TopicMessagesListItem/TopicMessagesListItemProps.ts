import { TopicMessage } from '../../../types/common';

/**
 * Свойства компонента элемента списка сообщений топика
 */
export interface TopicMessagesListItemProps extends TopicMessage {
  /**
   * Событие изменения сообщения
   */
  onEdit?: (id: string) => void;

  /**
   * Событие удаления сообщения
   */
  onDelete?: (id: string) => void;
}
