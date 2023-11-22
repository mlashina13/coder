/* eslint-disable no-console */
import React, { FC, useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { MenuProps } from './MenuProps';
import './menuStyles.scss';

/**
 * Компонент "Меню"
 */
export const Menu: FC<MenuProps> = (props) => {
  const { menuItems, defaultSelected } = props;
  const [selectedItem, selectedChangedHandler] = useState(menuItems[defaultSelected as number].key);

  /**
   * Выбран ли элемент меню
   */
  const isSelected = (value: string) => selectedItem === value;

  return (
    <Box className='main-menu'>
      <BottomNavigation
        showLabels
        value={selectedItem}
        onChange={(_, newValue) => selectedChangedHandler(newValue)}
      >
        {menuItems.map((r) => (
          <BottomNavigationAction
            key={r.key}
            label={r.displayName}
            value={r.key}
            component={Link}
            to={r.path}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};
