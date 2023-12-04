import React, { FC } from 'react';
import './LeaderBordIListStyles.scss';
import { Container, ListItem, ListItemText } from '@mui/material';
import { LeaderBordItem } from './LeaderBordItem/LeaderBordItem';
import { LeaderBordListProps } from './LeaderBordListProps';
import { Title } from '../common/Title/Title';

/**
 * Компонент списка результатов
 */
export const LeaderBordList: FC<LeaderBordListProps> = ({ leaderBordList = [] }) => (
  <Container>
    <Title className='leader-bord-title'>Таблица результатов</Title>
    <ListItem className='leader-bord-list-title'>
      <ListItemText className='leader-bord-lest-title__place'>
        <div>Место</div>
      </ListItemText>
      <ListItemText className='leader-bord-list-title__name' primary='Имя игрока' />
      <ListItemText className='leader-bord-list-title__point' primary='Количество очков' />
    </ListItem>
    {leaderBordList.map((item, index) => (
      <LeaderBordItem key={index} item={item} />
    ))}
  </Container>
);
