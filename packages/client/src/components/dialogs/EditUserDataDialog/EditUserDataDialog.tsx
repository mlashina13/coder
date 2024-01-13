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
    <Dialog onClose={onClose} open={open} className='edit-user-data-dialog'>
      <DialogLayout contentClassName='edit-user-data-dialog__content'>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab
            label='Редактировать профиль'
            value={TABS_VALUE.userEditForm}
            className='edit-user-data-dialog__tab'
          />
          <Tab
            label='Редактировать пароль'
            value={TABS_VALUE.passwordEditForm}
            className='edit-user-data-dialog__tab'
          />
        </Tabs>
        {activeTab === TABS_VALUE.userEditForm && <UserEditForm onClose={onClose} />}
        {activeTab === TABS_VALUE.passwordEditForm && <PasswordEditForm onClose={onClose} />}
      </DialogLayout>
    </Dialog>
  );
};
