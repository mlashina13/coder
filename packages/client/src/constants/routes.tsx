import React from 'react';
import { HomeIcon, MessageIcon, ProfileIcon } from '../assets';
import { RouteInfo } from '../types/common';

/** Верхнее Навигационное меню */
export const ROUTER_URLS = {
  /**
   * Главная страница
   */
  Main: '/',
  /**
   * Страница входа
   */
  Login: '/login',
  /**
   * Страница регистрации
   */
  Registration: '/registration',
  /**
   * Страница профиля пользователя
   */
  Profile: '/profile',
  /**
   * Страница лидерборда
   */
  Leaderboard: '/leaderboard',
  /**
   * Страница с игрой
   */
  Game: '/game',
  /**
   * Страница форума
   */
  Forum: '/forum',
  /**
   * Страница топика форума
   */
  ForumTopic: '/forum/:topicId',
} as const;

export const LOGIN_ROUTES = {
  /**
   * Страница входа
   */
  Login: ROUTER_URLS.Login,
  /**
   * Страница регистрации
   */
  Registration: ROUTER_URLS.Registration,
} as const;

/**
 * Константы элементов роутинга
 */
export const ROUTES: Array<RouteInfo> = [
  {
    key: 'main',
    path: ROUTER_URLS.Main,
    displayName: 'Главная',
    renderIconFunction: (className) => <HomeIcon className={className} />,
  },
  {
    key: 'forum',
    path: ROUTER_URLS.Forum,
    displayName: 'Форум',
    renderIconFunction: (className) => <MessageIcon className={className} />,
  },
  {
    key: 'profile',
    path: ROUTER_URLS.Profile,
    displayName: 'Профиль',
    renderIconFunction: (className) => <ProfileIcon className={className} />,
  },
];
