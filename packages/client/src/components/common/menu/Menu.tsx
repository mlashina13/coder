import React, { FC, useMemo, useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { MenuItem } from '../../../types/common';
import { MenuProps } from './MenuProps';
import './menuStyles.scss';

/**
 * Компонент "Меню"
 */
export const Menu: FC<MenuProps> = (props) => {
  const { menuItems, selectedChanged, defaultSelected } = props;

  const [selectedItem, setSelectedItem] = useState<string | number | undefined>(defaultSelected);

  /**
   * Убираем элементы, id которых повторяется в наборе
   */
  const uniqueItems: Array<MenuItem> = useMemo(
    () =>
      menuItems.reduce(
        (prev, curr) => (prev.some((p) => p.id === curr.id) ? prev : [...prev, curr]),
        [] as Array<MenuItem>
      ),
    [menuItems]
  );

  /**
   * Обработчик изменения выбора элемента меню
   */
  const selectedChangedHandler = (id: string) => {
    setSelectedItem(id);
    // eslint-disable-next-line no-unused-expressions
    selectedChanged && selectedChanged(id);
  };

  if (uniqueItems.length !== menuItems.length) {
    console.warn('You try to use menu items with same id. All duplicates was removed!');
  }

  return (
    <Box className='main-menu'>
      <BottomNavigation
        showLabels
        value={selectedItem}
        onChange={(_, newValue) => selectedChangedHandler(newValue)}
      >
        {uniqueItems.map((item) => (
          <BottomNavigationAction
            className='main-menu__item'
            key={item.id}
            label={item.label}
            value={item.id}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};
