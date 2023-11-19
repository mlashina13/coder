import { Box } from '@mui/material';

import { AuthHeader, DialogLayout } from '../../components';
import { RegistrationForm } from './RegistrationForm';

import './registrationPageStyles.scss';

/** страница регистрации */
export const RegistrationPage = () => (
  <Box className='registration-page'>
    <DialogLayout contentClassName='registration-page__content'>
      <AuthHeader />
      <RegistrationForm />
    </DialogLayout>
  </Box>
);
