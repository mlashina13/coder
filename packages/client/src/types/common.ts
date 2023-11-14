import { ReactNode } from 'react'

/**
 * Свойства компонента иконки
 */
export interface IconProps {
  /**
   * Набор css-классов
   */
  className?: string

  /**
   * Событие клика
   */
  onClick?: () => void

  /**
   * Ширина
   */
  width?: string | number

  /**
   * Высота
   */
  height?: string | number

  /**
   * Цвет иконки
   */
  color?: string
}

/**
 * Элемент меню
 */
export interface MenuItem {
  /**
   * Текст элемента
   */
  label: string

  /**
   * Идентификатор
   */
  id: number | string

  /**
   * Иконка
   */
  icon?: ReactNode
}
