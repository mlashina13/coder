import React, { FC, SyntheticEvent, useState } from 'react';
import { Box, Dialog, Tab, Tabs } from '@mui/material';

import { DialogLayout } from '../../common';
import { EditUserDataDialogProps } from './EditUserDataDialogProps';

import './editUserDataDialogStyles.scss';
import { UserEditForm } from './UserEditForm';
import { PasswordEditForm } from './PasswordEditForm';
import { EditUserDataDialogState } from './EditUserDataDialogState';
import { TABS_VALUE } from './constants';

export const EditUserDataDialog: FC<EditUserDataDialogProps> = ({ handleClose, open }) => {
  const [activeTab, setActiveTab] = useState<EditUserDataDialogState>(TABS_VALUE.userEditForm);

  const handleChange = (event: SyntheticEvent, newValue: EditUserDataDialogState) => {
    setActiveTab(newValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogLayout contentClassName='edit-user-data-dialog'>
        <Tabs value={activeTab} onChange={handleChange} centered>
          <Tab label='Редатировать профиль' value={TABS_VALUE.userEditForm} />
          <Tab label='Редатировать пароль' value={TABS_VALUE.passwordEditForm} />
        </Tabs>
        {activeTab === TABS_VALUE.userEditForm && <UserEditForm handleClose={handleClose} />}
        {activeTab === TABS_VALUE.passwordEditForm && (
          <PasswordEditForm handleClose={handleClose} />
        )}
      </DialogLayout>
    </Dialog>
  );
};
