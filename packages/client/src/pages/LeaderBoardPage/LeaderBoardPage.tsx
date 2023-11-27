import React, { FC } from 'react';
import { Layout } from '../../components';
import { Menu } from '../../components/common/menu/Menu';
import { SUBMENU_ROUTES } from '../../constants/routes';

export const LeaderBoardPage: FC = () => (
  <Layout subMenu={<Menu menuItems={SUBMENU_ROUTES} defaultSelected='2' />} />
);
