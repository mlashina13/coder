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

/**
 * Модель сообщения топика
 */
export interface TopicMessage {
  /**
   * Идентификатор
   */
  id: string;

  /**
   * Автор
   */
  creator: string;

  /**
   * Дата создания топика (date string)
   */
  creationDate: string;

  /**
   * Сообщение
   */
  message: string;
}

/**
 * Модель топика форума
 */
export interface Topic {
  /**
   * Идентификатор
   */
  id: string;

  /**
   * Тема
   */
  theme: string;

  /**
   * Дата создания топика (date string)
   */
  creationDate: string;

  /**
   * Автор
   */
  creator: string;

  /**
   * Кол-во сообщений
   */
  messagesCount: number;

  /**
   * Кол-во просмотров
   */
  viewsCount: number;

  /**
   * Список сообщений
   */
  messages?: Array<TopicMessage>;
}

/**
 * интерфейс данных пользователя
 */
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

/**
 * интерфейс данных для регистрации
 */
export interface RegistrationData {
  login: string;
  password: string;
  email: string;
  phone: string;
  second_name: string;
  first_name: string;
}

/**
 * Модель данных для изменения пароля
 */
export interface PasswordData {
  oldPassword: string;
  newPassword: string;
}

/**
 * Модель данных для логина
 */
export interface LoginData {
  login: string;
  password: string;
}

/**
 * Модель данных для изменения данных профиля пользователя
 */
export interface UserEditProfileData {
  email?: string;
  phone?: string;
  second_name?: string;
  first_name?: string;
}

export interface LeaderboardInfoData {
  /** Имя пользователя */
  name?: string;

  /** Количество очков */
  coderPoint?: number;

  /** Количество цветов */
  colorsCount: number;

  /** Размер поля */
  stepsCount: number;

  /** Почта пользователя* */
  email?: string;
}

/** service_id */
export interface ServiceId {
  service_id: string;
}

/** авторизация через яндекс */
export interface YandexLoginData {
  redirect_uri: string;
  code: string;
}

/**
 * Обновление темы пользователя
 */
export interface ThemeData {
  userId: string;
  theme: string;
}
