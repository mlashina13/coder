import React from 'react';
import { Layout } from '../../components/index';
import { AboutGamePage } from '../GamePages/AboutGames/AboutGamePage';
import { Menu } from '../../components/common/menu/Menu';
import { SUBMENU_ROUTES } from '../../constants';

export const MainPage: React.FC = () => (
  <Layout subMenu={<Menu menuItems={SUBMENU_ROUTES} defaultSelected='0' />}>
    <AboutGamePage />
  </Layout>
);
