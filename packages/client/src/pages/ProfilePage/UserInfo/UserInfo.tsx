import { FC, useState } from 'react';
import { Box } from '@mui/material';
import { EditProfileIcon } from '../../../assets';
import { EditUserDataDialog, InfoTextBlock, Title } from '../../../components';
import { useAppSelector } from '../../../hooks';
import './userInfoStyles.scss';

/**
 * Компонент отображения персоналбных данных пользователя
 */
export const UserInfo: FC = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  /**
   * Обработчик закрытия диалогового окна
   * редактирования данных пользователя
   */
  const handleUserEditDialogClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className='user-info'>
        <Box className='user-info__row'>
          <Title variant='h6' className='user-info__row__user-name'>
            {currentUser?.first_name} {currentUser?.second_name}
          </Title>
          {currentUser ? (
            <EditProfileIcon className='user-info__edit-icon' onClick={() => setOpen(true)} />
          ) : null}
        </Box>
        <InfoTextBlock
          labelClassName='user-info__row__label'
          valueClassName='user-info__row__value'
          label='Логин'
          value={currentUser?.login}
        />
        <InfoTextBlock
          labelClassName='user-info__row__label'
          valueClassName='user-info__row__value'
          label='Почта'
          value={currentUser?.email}
        />
        <InfoTextBlock
          labelClassName='user-info__row__label'
          valueClassName='user-info__row__value'
          label='Имя'
          value={currentUser?.first_name}
        />
        <InfoTextBlock
          labelClassName='user-info__row__label'
          valueClassName='user-info__row__value'
          label='Фамилия'
          value={currentUser?.second_name}
        />
        <InfoTextBlock
          labelClassName='user-info__row__label'
          valueClassName='user-info__row__value'
          label='Телефон'
          value={currentUser?.phone}
        />
      </Box>
      <EditUserDataDialog onClose={handleUserEditDialogClose} open={open} />
    </>
  );
};
