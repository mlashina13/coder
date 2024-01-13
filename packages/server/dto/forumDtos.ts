/**
 * DTO создания топика
 */
export interface CreateTopicDto {
  /**
   * Идентификатор автора
   */
  authorId: number;

  /**
   * Название
   */
  title: string;
}

/**
 * DTO изменения топика
 */
export interface UpdateTopicDto {
  /**
   * Идентификатор топика
   */
  id: number;

  /**
   * Название
   */
  title: string;
}

/**
 * DTO создания комментария
 */
export interface CreateCommentDto {
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

/**
 * DTO изменения комментария
 */
export interface UpdateCommentDto {
  /**
   * Идентификатор
   */
  id: number;

  /**
   * Текст комментария
   */
  text: string;
}

/**
 * DTO создания ответа
 */
export interface CreateReplyDto {
  /**
   * Идентификатор комментария
   */
  commentId: number;

  /**
   * Идентификатор автора
   */
  authorId: number;

  /**
   * Текст ответа
   */
  text: string;
}

/**
 * DTO изменения ответа
 */
export interface UpdateReplyDto {
  /**
   * Идентификатор
   */
  id: number;

  /**
   * Текст ответа
   */
  text: string;
}
