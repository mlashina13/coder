import { FC } from 'react';
import { ListItem, ListItemText } from '@mui/material';
import './LeaderBordItemStyles.scss';
import { LeaderBordItemProps } from './LeaderBordItemProps';

/**
 * Компонент элемента результата
 */
export const LeaderBordItem: FC<LeaderBordItemProps> = ({ item }) => (
  <ListItem className='leader-bord-item'>
    <ListItemText className='leader-bord-item__place'>
      <div>{item.place}</div>
    </ListItemText>
    <ListItemText className='leader-bord-item__name' primary={item.name} />
    <ListItemText className='leader-bord-item__point' primary={item.point} />
  </ListItem>
);
