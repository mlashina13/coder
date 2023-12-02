import { ChangeEventHandler, FC, useRef } from 'react';
import { Avatar } from '@mui/material';
import { Button, DialogLayout } from '../../../components';
import { getImageSrc } from '../../../utils';
import { updateAvatar } from '../../../services';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import './avatarBoxStyles.scss';

/**
 * Компонент аватара пользователя
 */
export const AvatarBox: FC = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Обработчик события смены аватарки
   */
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target?.files;
    if (files?.length) {
      const formData = new FormData();
      formData.append('avatar', files[0]);
      dispatch(updateAvatar(formData));
    }
  };

  return (
    <DialogLayout className='avatar-box' contentClassName='avatar-box__content'>
      <Avatar
        className='avatar-box__content__avatar'
        src={getImageSrc(currentUser?.avatar)}
        variant='square'
      />
      {currentUser ? (
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
