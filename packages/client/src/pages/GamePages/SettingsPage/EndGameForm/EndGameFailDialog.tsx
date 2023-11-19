import './EndGameDialog.scss';
import React from 'react';
import { Box } from '@mui/material';
import { Button } from '../../../../components';
import { StartIcon } from '../../../../assets/icons/StartIcon';
import { DialogLayout } from '../../../../components/common/DialogLayout/DialogLayout';
import { Title } from '../../../../components/common/Title/Title';

/**
 * Диалоговое окно завершения игры, если пользователь проиграл в игре*
 * */

export const EndGameFailDialog = () => (
  <Box className='end-game-dialog error'>
    <DialogLayout contentClassName='end-game-dialog__content'>
      <Title className='end-game-dialog__content__title' component='h2' align='center'>
        Увы, Вы проиграли!
      </Title>
      <StartIcon className='end-game-dialog__content__icon' />
      <Box className='end-game-dialog__content__buttons-block'>
        <Button label='Играть!' type='submit' />
        <Button label='Выход' className='cancel' type='submit' />
      </Box>
    </DialogLayout>
  </Box>
);
