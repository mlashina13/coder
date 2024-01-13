/**
 * Интерфейс модели реакции
 */
export interface Reaction {
  /**
   * Идентификатор реакции
   */
  id: number;

  /**
   * Идентификатор топика
   */
  topicId: number;

  /**
   * Идентификатор пользователя
   */
  userId: number;

  /**
   * Идентификатор эмодзи
   */
  emojiId: number;
}
