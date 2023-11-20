import { useFormik } from 'formik';

import { FC } from 'react';
import { Button, Input } from '../../../common';
import { User } from '../../../../services';
import { PasswordEditFormProps, PasswordEditFormValues } from './types';

import { passwordValidationSchema } from './validationSchema';

import './passwordEditFormStyles.scss';

export const PasswordEditForm: FC<PasswordEditFormProps> = ({ handleClose }) => {
  const formik = useFormik<PasswordEditFormValues>({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
    validationSchema: passwordValidationSchema,
    onSubmit: async (formValues) => {
      try {
        await User.updatePassword(formValues);
        handleClose();
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
