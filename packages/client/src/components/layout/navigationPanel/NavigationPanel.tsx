import { FC, useState } from 'react';
//import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { routes } from '../../../constants/';
import './navigationPanelStyles.scss';
import classes from 'classnames';

/**
 * Элементы меню навигации
 */
enum NavItems {
  Home,
  Forum,
  Profile,
}

// TODO: добавить переход по страницам после подключения роутинга
/**
 * Компонент "Панель навигации"
 */
export const NavigationPanel: FC = () => {
  const [selectedItem, setSelectedItem] = useState(NavItems.Home);

  /**
   * Выбран ли элемент меню
   */
  const isSelected = (value: number) => selectedItem === value;

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
                classes('navigation-panel__icon', {
                  'navigation-panel__icon_selected': isSelected(NavItems.Home),
                })
              )
            : null;
          return (
            <BottomNavigationAction
              key={r.key}
              label={r.displayName}
              value={r.key}
              icon={icon}
              //component={Link} to={r.path}
            />
          );
        })}
      </BottomNavigation>
    </Box>
  );
};
