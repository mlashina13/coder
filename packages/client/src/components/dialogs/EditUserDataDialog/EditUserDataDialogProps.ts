/**
 * Свойства компонента диалогового окна редактирования пользователя
 */
export interface EditUserDataDialogProps {
  /**
   * Признак того, что окно открыто
   */
  open: boolean;

  /**
   * Событие закрытия
   */
  onClose: () => void;
}
