/* eslint-disable no-unused-vars */
import React, { FC, useState } from 'react';
// import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import clsx from 'clsx';
import { routes } from '../../../constants';
import './navigationPanelStyles.scss';

// TODO: добавить переход по страницам после подключения роутинга
/**
 * Компонент "Панель навигации"
 */
export const NavigationPanel: FC = () => {
  const [selectedItem, setSelectedItem] = useState(routes[0].key);

  /**
   * Выбран ли элемент меню
   */
  const isSelected = (value: string) => selectedItem === value;

  return (
    <Box className='navigation-panel'>
      <BottomNavigation
        showLabels
        value={selectedItem}
        onChange={(_, newValue) => {
          setSelectedItem(newValue);
        }}
      >
        {routes.map((r) => {
          const icon = r.renderIconFunction
            ? r.renderIconFunction(
              clsx('navigation-panel__icon', {
                'navigation-panel__icon_selected': isSelected(r.key),
              })
            )
            : null;
          return (
            <BottomNavigationAction
              key={r.key}
              label={r.displayName}
              value={r.key}
              icon={icon}
            // component={Link} to={r.path}
            />
          );
        })}
      </BottomNavigation>
    </Box>
  );
};
