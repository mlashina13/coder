/**
 * Интерфейс модели ответа на комментарий
 */
export interface Reply {
  /**
   * Идентификатор автора
   */
  authorId: number;

  /**
   * Идентификатор комментария
   */
  commentId: number;

  /**
   * Текст ответа
   */
  text: string;
}
