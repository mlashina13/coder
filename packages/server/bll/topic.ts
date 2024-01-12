/**
 * Интерфейс модели топика
 */
export interface Topic {
  /**
   * Идентификатор
   */
  id?: number;

  /**
   * Идентификатор автора
   */
  authorId: number;

  /**
   * Кол-во сообщений
   */
  messagesCount: number;

  /**
   * Название
   */
  title: string;

  /**
   * Кол-во просмотров
   */
  viewsCount: number;
}
