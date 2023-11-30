/* eslint-disable no-console */
import { FC } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { LogoIcon, LogoutIcon } from '../../../assets';
import { HeaderProps } from './HeaderProps';
import { useAppDispatch } from '../../../hooks';
import { logout } from '../../../services';
import './headerStyles.scss';

/**
 * Компонент заголовка страницы
 */
export const Header: FC<HeaderProps> = (props) => {
  const dispatch = useAppDispatch();
  const { title } = props;

  /**
   * Обработчик разлогина
   */
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Box className='page-header'>
      <Box className='page-header__logo'>
        <LogoIcon />
        CODER
      </Box>
      <Box>
        <Typography variant='h6' className='page-header__title'>
          {title}
        </Typography>
      </Box>
      <Tooltip title='Выйти'>
        <IconButton onClick={logoutHandler}>
          <LogoutIcon className='page-header__logout' />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
