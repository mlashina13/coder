import React from 'react';
import { Layout } from '../../components/index';
import { Menu } from '../../components/common/menu/Menu';
import { SettingsGamePage } from '../GamePages/SettingsPage/SettingsGamePage';
import { SUBMENU_ROUTES } from '../../constants/routes';

export const GamePage = () => (
  <Layout subMenu={<Menu menuItems={SUBMENU_ROUTES} defaultSelected='1' />}>
    <SettingsGamePage />
  </Layout>
);
