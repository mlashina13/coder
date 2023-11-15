import { HomeIcon, MessageIcon, ProfileIcon } from '../assets';
import { RouteInfo } from '../types/common';

/**
 * Константы элементов роутинга
 */
export const routes: Array<RouteInfo> = [
  {
    key: 'main',
    path: '/',
    displayName: 'Главная',
    renderIconFunction: (className) => {
      return <HomeIcon className={className} />;
    },
  },
  {
    key: 'forum',
    path: '/forum',
    displayName: 'Форум',
    renderIconFunction: (className) => {
      return <MessageIcon className={className} />;
    },
  },
  {
    key: 'profile',
    path: '/profile',
    displayName: 'Профиль',
    renderIconFunction: (className) => {
      return <ProfileIcon className={className} />;
    },
  },
];
