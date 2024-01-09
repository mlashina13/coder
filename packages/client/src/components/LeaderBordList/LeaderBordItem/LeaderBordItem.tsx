import React, { FC } from 'react';
import { ListItem, ListItemText } from '@mui/material';
import './LeaderBordItemStyles.scss';
import { LeaderBordItemProps } from './LeaderBordItemProps';

/**
 * Компонент элемента результата
 */
export const LeaderBordItem: FC<LeaderBordItemProps> = ({ item, index }) => (
  <ListItem className='leader-bord-item'>
    <ListItemText className='leader-bord-item__place'>
      <div>{index}</div>
    </ListItemText>
    <ListItemText className='leader-bord-item__name' primary={item?.name} />
    <ListItemText className='leader-bord-item__param' primary={item?.colorsCount} />
    <ListItemText className='leader-bord-item__param'>
      {item?.stepsCount}x{(item?.colorsCount || 0) - 1}
    </ListItemText>
    <ListItemText className='leader-bord-item__point' primary={item?.coderPoint} />
  </ListItem>
);
