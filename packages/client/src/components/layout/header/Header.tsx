/* eslint-disable no-console */
import { FC, useMemo } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { LogoIcon, LogoutIcon, MoonIcon, SunIcon } from '../../../assets';
import { HeaderProps } from './HeaderProps';
import { setTheme } from '../../../store/slices/themeSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { logout } from '../../../services';
import { DARK_THEME, LIGHT_THEME } from '../../../constants';
import './headerStyles.scss';

/**
 * Компонент заголовка страницы
 */
export const Header: FC<HeaderProps> = (props) => {
  const dispatch = useAppDispatch();
  const { title } = props;
  const theme = useAppSelector((state) => state.themes.actualTheme);

  const isDarkTheme = useMemo(() => theme === DARK_THEME, [theme]);

  /**
   * Обработчик разлогина
   */
  const logoutHandler = () => {
    dispatch(logout());
  };

  const changeThemeHandler = () => {
    const newTheme = isDarkTheme ? LIGHT_THEME : DARK_THEME;
    dispatch(setTheme(newTheme));
  };

  return (
    <Box className='page-header'>
      <Box className='page-header__logo'>
        <LogoIcon />
        CODER
        <img src='/src/assets/img/santy.png' alt='С Новым годом!' className='page-header__santa' />
      </Box>
      <Box>
        <Typography variant='h6' className='page-header__title'>
          {title}
        </Typography>
      </Box>
      <Box>
        <IconButton onClick={changeThemeHandler}>
          {isDarkTheme ? <MoonIcon /> : <SunIcon />}
        </IconButton>
        <Tooltip title='Выйти'>
          <IconButton onClick={logoutHandler}>
            <LogoutIcon className='page-header__logout' />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
