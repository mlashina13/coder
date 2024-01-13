import { FC, SyntheticEvent, useState } from 'react';
import { Dialog, Tab, Tabs } from '@mui/material';
import { DialogLayout } from '../../common';
import { EditUserDataDialogProps } from './EditUserDataDialogProps';
import { UserEditForm, PasswordEditForm } from '../../forms';
import { EditUserDataDialogMode } from './EditUserDataDialogMode';
import { TABS_VALUE } from './constants';
import './editUserDataDialogStyles.scss';

/**
 * Компонент диалогового окна редактирования пользователя
 */
export const EditUserDataDialog: FC<EditUserDataDialogProps> = (props) => {
  const { onClose, open } = props;
  const [activeTab, setActiveTab] = useState<EditUserDataDialogMode>(TABS_VALUE.userEditForm);

  /**
   * Обработчик события смены таба
   */
  const handleTabChange = (event: SyntheticEvent, newValue: EditUserDataDialogMode) => {
    setActiveTab(newValue);
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogLayout contentClassName='edit-user-data-dialog'>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label='Редатировать профиль' value={TABS_VALUE.userEditForm} />
          <Tab label='Редатировать пароль' value={TABS_VALUE.passwordEditForm} />
        </Tabs>
        {activeTab === TABS_VALUE.userEditForm && <UserEditForm onClose={onClose} />}
        {activeTab === TABS_VALUE.passwordEditForm && <PasswordEditForm onClose={onClose} />}
      </DialogLayout>
    </Dialog>
  );
};
