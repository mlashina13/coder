import { SyntheticEvent, useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';

import { LogoIcon } from '../../assets';
import { AuthHeaderProps } from './AuthHeaderProps';

import './authHeaderStyles.scss';

export const AuthHeader = (props: AuthHeaderProps) => {
  /** TODO после рализации роутинга использовать функионал из реакт-роутер-дом для перехода по ссылкам и мониторинга текущего урла */
  const [mockLocation, setMockLocation] = useState<'login' | 'registration'>('login');

  /** TODO убрать сетстейт и заменить на обработчик навигации */
  const handleChange = (event: SyntheticEvent, newValue: 'login' | 'registration') => {
    setMockLocation(newValue);
  };
  return (
    <Box className='auth-header'>
      <Box className='auth-header__logo'>
        <LogoIcon width={43} height={29} />
        <Typography className='auth-header__logo__title'>Coder</Typography>
      </Box>

      <Tabs value={mockLocation} onChange={handleChange} centered>
        <Tab label='Вход' value='login' />
        <Tab label='Регистрация' value='registration' />
      </Tabs>
    </Box>
  );
};
