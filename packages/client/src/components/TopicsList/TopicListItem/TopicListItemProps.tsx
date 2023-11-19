import { Topic } from '../../../types/common';

/**
 * Свойства компонента элемента списка топиков
 */
export interface TopicListItemProps extends Topic {
  /**
   * Событие изменения топика
   */
  onEdit?: (id: string) => void;

  /**
   * Событие удаления топика
   */
  onDelete?: (id: string) => void;

  /**
   * Событие клика по топику
   */
  onClick?: (id: string) => void;
}
