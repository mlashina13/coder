/* eslint-disable no-console */
import React, { FC } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { LogoIcon, LogoutIcon } from '../../../assets';
import { HeaderProps } from './HeaderProps';
import { ROUTER_URLS } from '../../../constants';
import { Auth } from '../../../services';
import { useUserStore } from '../../../stores';

import './headerStyles.scss';

/**
 * Компонент заголовка страницы
 */
export const Header: FC<HeaderProps> = (props) => {
  const { setUserData } = useUserStore();
  const navigate = useNavigate();
  const { title } = props;

  /**
   * Обработчик разлогина
   */
  const logoutHandler = () => {
    Auth.logOut().then(() => {
      // TODO: В будущем необходимо реализовать стор с данными пользователя!
      navigate(ROUTER_URLS.Login);
      setUserData?.();
    });
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
