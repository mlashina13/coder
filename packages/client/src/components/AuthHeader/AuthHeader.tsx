import { useLocation, useNavigate } from 'react-router-dom';
import { SyntheticEvent, useMemo, useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { LogoIcon } from '../../assets';
import { AuthHeaderProps } from './AuthHeaderProps';
import './authHeaderStyles.scss';
import { LOGIN_ROUTES } from '../../constants';

type LoginTabsPaths = keyof typeof LOGIN_ROUTES;
type Values = (typeof LOGIN_ROUTES)[LoginTabsPaths];

const TABS_KEYS: Record<
  string,
  {
    key: Values;
    label: string;
  }
> = {
  Login: {
    key: LOGIN_ROUTES.Login,
    label: 'Вход',
  },
  Registration: {
    key: LOGIN_ROUTES.Registration,
    label: 'Регистрация',
  },
};

export const AuthHeader = (props: AuthHeaderProps) => {
  const { pathname: mockLocation } = useLocation();
  const navigate = useNavigate();

  const handleChange = (_: SyntheticEvent, path: LoginTabsPaths) => navigate(path);

  return (
    <Box className='auth-header'>
      <Box className='auth-header__logo'>
        <LogoIcon width={43} height={29} />
        <Typography className='auth-header__logo__title'>Coder</Typography>
      </Box>

      <Tabs value={mockLocation} onChange={handleChange} centered>
        <Tab label={TABS_KEYS.Login.label} value={TABS_KEYS.Login.key} />
        <Tab label={TABS_KEYS.Registration.label} value={TABS_KEYS.Registration.key} />
      </Tabs>
    </Box>
  );
};
