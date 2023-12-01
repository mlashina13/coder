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
   * Страница "Правила игры"
   */
  Rule: '/rule',
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
   * Страница списка интересных фактов
   */
  Informations: '/info',
  /**
   * Страница списка интересных фактов
   */
  InformationFact: '/info/:infoId',
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

export const SUBMENU_ROUTES: Array<RouteInfo> = [
  {
    key: '/',
    path: ROUTER_URLS.Main,
    displayName: 'Правила Игры',
    renderIconFunction: (className) => <HomeIcon className={className} />,
  },
  {
    key: 'game',
    path: ROUTER_URLS.Game,
    displayName: 'Начать игру',
    renderIconFunction: (className) => <MessageIcon className={className} />,
  },
  {
    key: 'leaderboard',
    path: ROUTER_URLS.Leaderboard,
    displayName: 'Результаты',
    renderIconFunction: (className) => <ProfileIcon className={className} />,
  },
  {
    key: 'info',
    path: ROUTER_URLS.Informations,
    displayName: 'Интересные факты',
  },
];
