import React, { FC, useEffect } from 'react';
import { Container } from '@mui/material';
import { Layout } from '../../components';
import { Menu } from '../../components/common/menu/Menu';
import { SUBMENU_ROUTES } from '../../constants/routes';
import { getLeaderboards } from '../../services/leaderboardService';
import { useAppDispatch } from '../../hooks/reduxToolkitHooks';
import { LeaderBordList } from '../../components/LeaderBordList/LeaderBordList';

export const LeaderBoardPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const data = {
      ratingFieldName: 'coderPoint',
      cursor: 0,
      limit: 10,
    };
    dispatch(getLeaderboards(data));
  }, []);

  return (
    <Layout subMenu={<Menu menuItems={SUBMENU_ROUTES} defaultSelected='2' />}>
      <Container className='leader-bord-page'>
        <LeaderBordList />
      </Container>
    </Layout>
  );
};
