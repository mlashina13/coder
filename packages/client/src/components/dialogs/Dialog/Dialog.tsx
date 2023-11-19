import { FC } from 'react';
import { Dialog as MuiDialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps } from './DialogProps';
import './dialogStyles.scss';

/**
 * Компонент диалогового окна
 */
export const Dialog: FC<DialogProps> = (props) => {
  const { actions, open = false, onClose, title, children } = props;

  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      className='coder-dialog'
      classes={{
        paper: 'coder-dialog__paper',
      }}
    >
      <DialogTitle className='coder-dialog__title'>{title}</DialogTitle>
      <DialogContent className='coder-dialog__body'>{children}</DialogContent>
      <DialogActions className='coder-dialog__actions'>{actions}</DialogActions>
    </MuiDialog>
  );
};
