import { FC, useState } from 'react'
//import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material'
import { HomeIcon, MessageIcon, ProfileIcon } from '../../../assets'
import './navigationPanelStyles.scss'
import clsx from 'classnames'

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
  const [selectedItem, setSelectedItem] = useState(NavItems.Home)

  /**
   * Выбран ли элемент меню
   */
  const isSelected = (value: number) => selectedItem === value

  return (
    <Box className="navigation-panel">
      <BottomNavigation
        showLabels
        value={selectedItem}
        onChange={(_, newValue) => {
          setSelectedItem(newValue)
        }}>
        <BottomNavigationAction
          label="Главная"
          value={NavItems.Home}
          icon={
            <HomeIcon
              className={clsx('navigation-panel__icon', {
                'navigation-panel__icon_selected': isSelected(NavItems.Home),
              })}
            />
          }
          // component={Link} to="/"
        />
        <BottomNavigationAction
          label="Форум"
          value={NavItems.Forum}
          icon={
            <MessageIcon
              className={clsx('navigation-panel__icon', {
                'navigation-panel__icon_selected': isSelected(NavItems.Forum),
              })}
            />
          }
          // component={Link} to="/forum"
        />
        <BottomNavigationAction
          label="Профиль"
          value={NavItems.Profile}
          icon={
            <ProfileIcon
              className={clsx('navigation-panel__icon', {
                'navigation-panel__icon_selected': isSelected(NavItems.Profile),
              })}
            />
          }
          // component={Link} to="/profile"
        />
      </BottomNavigation>
    </Box>
  )
}
