import { FC } from 'react';
import { Box } from '@mui/material';

import { AuthHeader, DialogLayout } from '../../components';
import { RegistrationForm } from './RegistrationForm';

import './registrationPageStyles.scss';

/** Cтраница регистрации */
export const RegistrationPage: FC = () => (
  <Box className='registration-page'>
    <DialogLayout contentClassName='registration-page__content'>
      <AuthHeader />
      <RegistrationForm />
    </DialogLayout>
  </Box>
);
