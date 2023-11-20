import { ReactNode } from 'react';

/**
 * Свойства компонента иконки
 */
export interface IconProps {
  /**
   * Набор css-классов
   */
  className?: string;

  /**
   * Событие клика
   */
  onClick?: () => void;

  /**
   * Ширина
   */
  width?: string | number;

  /**
   * Высота
   */
  height?: string | number;

  /**
   * Цвет иконки
   */
  color?: string;
}

/**
 * Элемент меню
 */
export interface MenuItem {
  /**
   * Текст элемента
   */
  label: string;

  /**
   * Идентификатор
   */
  id: string;

  /**
   * Иконка
   */
  icon?: ReactNode;
}

/**
 * Описание элемента роутинга
 */
export interface RouteInfo {
  /**
   * Уникальный ключ
   */
  key: string;

  /**
   * Путь (URL)
   */
  path: string;

  /**
   * Отображаемое имя
   */
  displayName: string;

  /**
   * Иконка навигации
   */
  // eslint-disable-next-line no-unused-vars
  renderIconFunction?: (className?: string) => ReactNode;
}

/** интерфейс данных пользователя */
export interface UserData {
  login?: string;
  display_name?: string;
  first_name: string;
  second_name: string;
  phone: string;
  email: string;
  avatar?: string;
  id?: string;
}

/** интерфейс данных для регистрации */
export interface RegistrationData {
  login: string;
  password: string;
  email: string;
  phone: string;
  second_name: string;
  first_name: string;
}

export interface PasswordData {
  oldPassword: string;
  newPassword: string;
}
