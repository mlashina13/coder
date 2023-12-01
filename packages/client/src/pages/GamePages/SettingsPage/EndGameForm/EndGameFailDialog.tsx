import './EndGameDialog.scss';
import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Button } from '../../../../components';
import { StartIcon } from '../../../../assets/icons/StartIcon';
import { EndGameDialogProps } from './EndGameDialogProps';
import { Dialog } from '../../../../components/dialogs/Dialog/Dialog';

/**
 * Диалоговое окно завершения игры, если пользователь проиграл в игре*
 * */
export const EndGameFailDialog: FC<EndGameDialogProps> = ({
  openDialog,
  onStartNewGame,
  onGoToMainPage,
  onRestart,
}) => (
  <Dialog open={openDialog} className='end-game-dialog error' title='Увы, Вы проиграли!'>
    <StartIcon className='end-game-dialog__content-icon' />
    <Box className='end-game-dialog__content__buttons-block'>
      <Button onClick={onStartNewGame} label='Новая игра' />
      <Button onClick={onGoToMainPage} label='На главную' />
    </Box>
    <Box className='end-game-dialog__content__buttons-block'>
      <Button onClick={onRestart} variant='outlined' label='Повторить игру' />
    </Box>
  </Dialog>
);
