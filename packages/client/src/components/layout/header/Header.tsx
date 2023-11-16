import React, { FC } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { LogoIcon, LogoutIcon } from '../../../assets';
import { HeaderProps } from './HeaderProps';
import './headerStyles.scss';

/**
 * Компонент заголовка страницы
 */
export const Header: FC<HeaderProps> = (props) => {
  const { title } = props;

  /**
   * Обработчик разлогина
   */
  const logoutHandler = () => {
    // TODO: В будущем необходимо реализовать выход!
    console.log('Logout clicked!');
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
