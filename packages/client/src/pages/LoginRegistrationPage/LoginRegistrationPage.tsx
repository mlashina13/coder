import { SyntheticEvent, useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';

import { LogoIcon } from '../../assets';
import { DialogLayout } from '../../components';

import './loginRegistrationPageStyle.scss';
import { LoginForm } from './LoginForm';

/** страница авторизации/регистрации */
export const LoginRegistrationPage = () => {
  /** TODO после рализации роутинга использовать функионал из реакт-роутер-дом для перехода по ссылкам и мониторинга текущего урла */
  const [mockLocation, setMockLocation] = useState<'login' | 'registration'>('login');

  /** TODO убрать сетстейт и заменить на обработчик навигации */
  const handleChange = (event: SyntheticEvent, newValue: 'login' | 'registration') => {
    setMockLocation(newValue);
  };

  return (
    <Box className='login-registration-page'>
      <DialogLayout contentClassName='login-registration-page__content'>
        <Box className='login-registration-page__content__header'>
          <Box className='login-registration-page__logo'>
            <LogoIcon width={43} height={29} />
            <Typography className='login-registration-page__logo__title'>Coder</Typography>
          </Box>

          <Tabs value={mockLocation} onChange={handleChange} centered>
            <Tab label='Вход ' value='login' />
            <Tab label='Регистрация' value='registration' />
          </Tabs>
        </Box>
        {mockLocation === 'login' && <LoginForm />}
      </DialogLayout>
    </Box>
  );
};
