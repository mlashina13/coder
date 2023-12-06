export interface ImageProps {
  /**
   * Набор css-классов
   */
  className?: string;

  /**
   * Событие клика
   */
  onClick?: () => void;

  /**
   * Ширина изображения
   */
  width?: string | number;

  /**
   * Высота изображения
   */
  height?: string | number;

  /**
   * Пусть к изображению
   */
  src: string | undefined;

  /**
   * Текст вместо картинки
   */
  alt: string;
}

/**
 * Элемент меню
 */
