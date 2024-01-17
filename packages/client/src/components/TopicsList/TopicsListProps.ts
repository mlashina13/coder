import { Topic } from '../../types/common';

/**
 * Свойства компонента списка топиков
 */
export interface TopicsListProps {
  /**
   * Общее кол-во топиков
   */
  topicsCount: number;

  /**
   * Событие смены страницы
   */
  onPageChange: (newPage: number) => void;

  /**
   * Топиков на странице
   */
  topicsPerPage: number;

  /**
   * Список топиков
   */
  topics?: Array<Topic>;

  /**
   * Событие создания топика
   */
  onCreateTopic?: () => void;

  /**
   * Событие удаления топика
   */
  onDeleteTopic?: (id: string) => void;

  /**
   * Событие изменения топика
   */
  onEditTopic?: (id: string) => void;

  /**
   * Событие клика по топику
   */
  onClickTopic?: (id: string) => void;
}
