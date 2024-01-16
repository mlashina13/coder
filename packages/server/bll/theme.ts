/**
 * Интерфейс модели темы
 */
export interface Theme {
  /**
   * Идентификатор
   */
  id?: number;

  /**
   * Идентификатор пользователя
   */
  userId: number;

  /**
   * Тип темы
   */
  theme: string;
}
