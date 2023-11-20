import React, { useEffect } from 'react';
import { Box } from '@mui/material';

import { Layout } from '../../components';
import { Auth } from '../../services';
import { useUserStore } from '../../stores';

import { AvatarBox } from './AvatarBox';

import './profilePageStyles.scss';
import { UserInfo } from './UserInfo';

/** страница пользователя */
export const ProfilePage: React.FC = () => (
  <Layout>
    <Box className='profile-page'>
      <AvatarBox />
      <UserInfo />
    </Box>
  </Layout>
);
