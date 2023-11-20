import React, { FC, useState } from 'react';
import { Box } from '@mui/material';

import { EditProfileIcon } from '../../../assets';
import { EditUserDataDialog, InfoTextBlock, Title } from '../../../components';
import { useUserStore } from '../../../stores';

import './userInfoStyles.scss';

/** данные пользователя */
export const UserInfo: FC = () => {
  const [open, setOpen] = useState(false);
  const { userData } = useUserStore();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className='user-info'>
        <Box className='user-info__row'>
          <Title variant='h6' className='user-info__row__user-name'>
            {userData?.first_name} {userData?.second_name}
          </Title>
          {userData ? (
            <EditProfileIcon className='user-info__edit-icon' onClick={() => setOpen(true)} />
          ) : null}
        </Box>
        <InfoTextBlock
          labelClassName='user-info__row__label'
          valueClassName='user-info__row__value'
          label='Логин'
          value={userData?.login}
        />
        <InfoTextBlock
          labelClassName='user-info__row__label'
          valueClassName='user-info__row__value'
          label='Почта'
          value={userData?.email}
        />
        <InfoTextBlock
          labelClassName='user-info__row__label'
          valueClassName='user-info__row__value'
          label='Имя'
          value={userData?.first_name}
        />
        <InfoTextBlock
          labelClassName='user-info__row__label'
          valueClassName='user-info__row__value'
          label='Фамилия'
          value={userData?.second_name}
        />
        <InfoTextBlock
          labelClassName='user-info__row__label'
          valueClassName='user-info__row__value'
          label='Телефон'
          value={userData?.phone}
        />
      </Box>
      <EditUserDataDialog handleClose={handleClose} open={open} />
    </>
  );
};
