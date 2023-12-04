import React, { FC, useState } from 'react';
import { Container } from '@mui/material';
import { Layout } from '../../components';
import { Menu } from '../../components/common/menu/Menu';
import { SUBMENU_ROUTES } from '../../constants/routes';
import { LeaderBordInfoData } from '../../types/common';
import { LeaderBordList } from '../../components/LeaderBordList/LeaderBordList';
import { LEADER_BOERD_MOKE_DATA } from './LeaderBordMokeData';

export const LeaderBoardPage: FC = () => {
  const [leaderBordList, setleaderBordList] =
    useState<LeaderBordInfoData[]>(LEADER_BOERD_MOKE_DATA);

  return (
    <Layout subMenu={<Menu menuItems={SUBMENU_ROUTES} defaultSelected='2' />}>
      <Container className='leader-bord-page'>
        <LeaderBordList leaderBordList={leaderBordList} />
      </Container>
    </Layout>
  );
};
