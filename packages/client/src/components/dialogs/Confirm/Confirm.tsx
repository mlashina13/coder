import { FC } from 'react';
import { Box } from '@mui/material';
import { Dialog } from '../Dialog';
import { Button } from '../../common';
import { ConfirmProps } from './ConfirmProps';
import './confirmStyles.scss';

/**
 * Компонент окна подтверждения
 */
export const Confirm: FC<ConfirmProps> = (props) => {
  const {
    message,
    onConfirm,
    cancelBtnText = 'Отмена',
    confirmBtnText = 'Да',
    onCancel,
    open,
    title,
  } = props;

  /**
   * Действия окна
   */
  const actions = (
    <Box className='confirm-dialog__actions'>
      <Button label={confirmBtnText} onClick={onConfirm} />
      <Button label={cancelBtnText} onClick={onCancel} variant='outlined' />
    </Box>
  );

  return (
    <Dialog
      title={title}
      actions={actions}
      onClose={onCancel}
      open={open}
      className='confirm-dialog'
    >
      <Box>{message}</Box>
    </Dialog>
  );
};
