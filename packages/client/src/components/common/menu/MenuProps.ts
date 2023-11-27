/* eslint-disable no-unused-vars */
import { MenuItem, RouteInfo } from '../../../types/common';

/**
 * Свойства компонента "Основное меню"
 */
export interface MenuProps {
  /**
   * Набор элементов меню
   */
  menuItems: Array<RouteInfo>;

  /**
   * Событие изменения выбранного пункта меню
   */
  selectedChanged?: (id: string) => void;

  /**
   * Выбранный по умолчанию пункт меню
   */
  defaultSelected?: number | string;
}
