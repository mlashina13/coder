import React, { FC } from 'react';
import './LeaderBordIListStyles.scss';
import { Container, ListItem, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import { LeaderBordItem } from './LeaderBordItem/LeaderBordItem';
import { LeaderBordListProps } from './LeaderBordListProps';
import { Title } from '../common/Title/Title';
import { useAppSelector } from '../../hooks/reduxToolkitHooks';

/**
 * Компонент списка результатов
 */
export const LeaderBordList: FC = () => {
  const { leaderboard } = useAppSelector((state) => state.leaderboard);
  return (
    <Container>
      <Title className='leader-bord-title'>Таблица результатов</Title>
      <ListItem className='leader-bord-list-title'>
        <ListItemText className='leader-bord-list-title__place'>
          <div>Место</div>
        </ListItemText>
        <ListItemText className='leader-bord-list-title__name' primary='Имя игрока' />
        <ListItemText className='leader-bord-list-title__param' primary='Количество цветов' />
        <ListItemText className='leader-bord-list-title__param' primary='Размер поля' />
        <ListItemText className='leader-bord-list-title__point' primary='Количество очков' />
      </ListItem>
      {leaderboard?.map((item, index) => (
        <LeaderBordItem index={index + 1} key={index} item={item?.data} />
      ))}
    </Container>
  );
};
