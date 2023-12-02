import { FC } from 'react';
import { Box } from '@mui/material';
import { Layout } from '../../components';
import { AvatarBox } from './AvatarBox';
import { UserInfo } from './UserInfo';
import './profilePageStyles.scss';

/**
 * Страница профиля пользователя
 */
export const ProfilePage: FC = () => (
  <Layout>
    <Box className='profile-page'>
      <AvatarBox />
      <UserInfo />
    </Box>
  </Layout>
);
