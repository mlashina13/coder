import { MenuItem } from '../../../types/common'

/**
 * Свойства компонента "Основное меню"
 */
export interface MenuProps {
  /**
   * Набор элементов меню
   */
  menuItems: Array<MenuItem>

  /**
   * Событие изменения выбранного пункта меню
   */
  selectedChanged: (id: string) => void

  /**
   * Выбранный по умолчанию пункт меню
   */
  defaultSelected?: string
}
