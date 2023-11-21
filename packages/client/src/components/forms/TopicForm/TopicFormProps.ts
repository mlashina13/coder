/**
 * Свойства компонента формы редактирования топика
 */
export interface TopicFormProps {
  /**
   * Тема
   */
  theme?: string;

  /**
   * Событие отправки формы
   */
  onFormSubmit: (theme: string) => void;

  /**
   * Событие отмены
   */
  onCancel: () => void;
}
