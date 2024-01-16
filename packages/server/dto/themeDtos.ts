/**
 * DTO создания темы
 */
export interface ThemeDto {
  /**
   * Идентификатор автора
   */
  userId: number;

  /**
   * Наименование темы
   */
  theme: string;
}
