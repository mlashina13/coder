import { FC } from 'react';
import { useFormik } from 'formik';
import { Button, Input } from '../../common';
import { User } from '../../../api';
import { validationSchema } from './validationSchema';
import { PasswordData } from '../../../types/common';
import { PasswordEditFormProps } from './PasswordEditFormProps';
import './passwordEditFormStyles.scss';

/**
 * Модель данных формы
 */
export interface PasswordEditFormData extends PasswordData {
  repeatNewPassword: string;
}

/**
 * Компонент формы редактирования пароля
 */
export const PasswordEditForm: FC<PasswordEditFormProps> = (props) => {
  const { onClose } = props;
  const formik = useFormik<PasswordEditFormData>({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
    validationSchema,
    onSubmit: async (formValues) => {
      try {
        await User.updatePassword(formValues);
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className='password-edit-form'>
      <Input
        name='oldPassword'
        value={formik.values.oldPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
        helperText={formik.touched.oldPassword && formik.errors.oldPassword}
        type='password'
        className='password-edit-form__input'
        label='Старый пароль'
        autoComplete='off'
      />
      <Input
        name='newPassword'
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
        helperText={formik.touched.newPassword && formik.errors.newPassword}
        type='password'
        className='password-edit-form__input'
        label='Новый пароль'
        autoComplete='off'
      />
      <Input
        name='repeatNewPassword'
        value={formik.values.repeatNewPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.repeatNewPassword && Boolean(formik.errors.repeatNewPassword)}
        helperText={formik.touched.repeatNewPassword && formik.errors.repeatNewPassword}
        type='password'
        className='password-edit-form__input'
        label='Повторите новый пароль'
        autoComplete='off'
      />
      <Button label='Сохранить' type='submit' />
    </form>
  );
};
