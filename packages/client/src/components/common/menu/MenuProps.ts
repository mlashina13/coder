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
  selectedChanged: (id: number | string) => void

  /**
   * Выбранный по умолчанию пункт меню
   */
  defaultSelected?: number | string
}
