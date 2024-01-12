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
}
