/**
 * Свойства компонента окна подтверждения
 */
export interface ConfirmProps {
  /**
   * Сообщение
   */
  message: string;

  /**
   * Событие подтверждения
   */
  onConfirm: () => void;

  /**
   * Текст кнопки отмены
   */
  cancelBtnText?: string;

  /**
   * Текст кнопки подтверждения
   */
  confirmBtnText?: string;

  /**
   * Событие отмены
   */
  onCancel?: () => void;

  /**
   * Признак, что окно открыто
   */
  open?: boolean;

  /**
   * Заголовок
   */
  title?: string;
}
