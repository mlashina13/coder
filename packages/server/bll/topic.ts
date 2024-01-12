/**
 * Интерфейс модели топика
 */
export interface Topic {
  /**
   * Идентификатор автора
   */
  authorId: number;

  /**
   * Кол-во сообщений
   */
  messagesCount?: number;

  /**
   * Название
   */
  title: string;

  /**
   * Кол-во просмотров
   */
  viewsCount?: number;

  /**
   * Идентификатор
   */
  id?: number;

  /**
   * Время изменения
   */
  updatedAt?: string;

  /**
   * Время создания
   */
  createdAt?: string;
}
