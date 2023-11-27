import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box } from '@mui/material';

import { Button, DialogLayout } from '../../../components';
import { User } from '../../../services';
import { useUserStore } from '../../../stores';
import { getImageSrc } from '../../../utils';

import './avatarBoxStyles.scss';

/**  аватарка пользователя */
export const AvatarBox: React.FC = () => {
  const { userData, setUserData } = useUserStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target?.files;
    if (files?.length) {
      const formData = new FormData();
      formData.append('avatar', files[0]);
      User.updateUserAvatar(formData).then((data) => {
        setUserData?.(data);
      });
    }
  };

  return (
    <DialogLayout className='avatar-box' contentClassName='avatar-box__content'>
      <Avatar
        className='avatar-box__content__avatar'
        src={getImageSrc(userData?.avatar)}
        variant='square'
      />
      {userData ? (
        <Button
          className='avatar-box__content__btn'
          label='Редактировать'
          onClick={() => inputRef.current?.click?.()}
          type='button'
        />
      ) : null}
      <input type='file' onChange={handleChange} ref={inputRef} />
    </DialogLayout>
  );
};
