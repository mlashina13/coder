import { Box } from '@mui/material';
import { AuthHeader, DialogLayout, YandexOAuth } from '../../components';
import { LoginForm } from '../../components/forms/LoginForm';

import './loginPageStyles.scss';

/** страница авторизации */
export const LoginPage = () => (
  <Box className='login-page'>
    <DialogLayout contentClassName='login-page__content'>
      <AuthHeader />
      <LoginForm />
      <YandexOAuth />
    </DialogLayout>
  </Box>
);
