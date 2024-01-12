/**
 * Интерфейс модели комментария
 */
export interface Comment {
  /**
   * Идентификатор топика
   */
  topicId: number;

  /**
   * Идентификатор автора
   */
  authorId: number;

  /**
   * Текст комментария
   */
  text: string;

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
