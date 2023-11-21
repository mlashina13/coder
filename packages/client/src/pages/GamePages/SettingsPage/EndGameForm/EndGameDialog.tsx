import './EndGameDialog.scss';
import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Button } from '../../../../components';
import { StartIcon } from '../../../../assets/icons/StartIcon';
import { DialogLayout } from '../../../../components/common/DialogLayout/DialogLayout';
import { Title } from '../../../../components/common/Title/Title';
import { InfoTextBlock } from '../../../../components/common/InfoTextBlock/InfoTextBlock';
import { EndGameDialogProps } from './EndGameDialogProps';

/**
 * Диалоговое окно завершения игры, если пользователь победил в игре
 * */
export const EndGameDialog: FC<EndGameDialogProps> = (props) => {
  const { time, place } = props;

  return (
    <Box className='end-game-dialog'>
      <DialogLayout contentClassName='end-game-dialog__content'>
        <Title className='end-game-dialog__content__title' component='h2' align='center'>
          Победа!
        </Title>
        <StartIcon className='end-game-dialog__content__icon' />
        <InfoTextBlock
          label='Ваше время:'
          value={time}
          className='end-game-dialog__content__field'
        />
        <InfoTextBlock
          label='Ваш рейтинг:'
          value={place}
          className='end-game-dialog__content__field'
        />
        <Box className='end-game-dialog__content__buttons-block'>
          <Button label='Играть!' type='submit' />
          <Button label='Мои достижения' type='submit' />
        </Box>
      </DialogLayout>
    </Box>
  );
};
