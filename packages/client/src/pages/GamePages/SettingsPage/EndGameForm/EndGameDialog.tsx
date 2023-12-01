import './EndGameDialog.scss';
import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Button } from '../../../../components';
import { StartIcon } from '../../../../assets/icons/StartIcon';
import { InfoTextBlock } from '../../../../components/common/InfoTextBlock/InfoTextBlock';
import { EndGameDialogProps } from './EndGameDialogProps';
import { Dialog } from '../../../../components/dialogs/Dialog/Dialog';

/**
 * Диалоговое окно завершения игры, если пользователь победил в игре
 * */
export const EndGameDialog: FC<EndGameDialogProps> = ({
  openDialog,
  statistic,
  onStartNewGame,
  onGoToMainPage,
  onGoToInfoPage,
}) => (
  <Dialog open={openDialog} className='end-game-dialog' title='Победа!'>
    <StartIcon className='end-game-dialog__content__icon' />
    <InfoTextBlock
      label='Ваше время:'
      value={statistic?.time?.toString()}
      className='end-game-dialog__content__field'
    />
    <InfoTextBlock
      label='Количесттво цветов:'
      value={statistic?.colorsCount?.toString()}
      className='end-game-dialog__content__field'
    />
    <InfoTextBlock
      label='Размер поля:'
      value={statistic?.stepsCount?.toString()}
      className='end-game-dialog__content__field'
    />
    <Box className='end-game-dialog__content__buttons-block'>
      <Button onClick={onStartNewGame} label='Новая игра' />
      <Button onClick={onGoToMainPage} variant='outlined' label='На главную' />
    </Box>
    <Box className='end-game-dialog__content__buttons-block'>
      <Button onClick={onGoToInfoPage} variant='outlined' label='Интересные факты' />
    </Box>
  </Dialog>
);
