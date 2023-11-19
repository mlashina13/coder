import { useFormik } from 'formik';

import { FC } from 'react';
import { Button, Input } from '../../../common';
import { User } from '../../../../services';
import { useUserStore } from '../../../../stores';

import { UserEditFormProps, UserEditFormValues } from './types';
import { userDataValidationSchema } from './validationSchema';

import './userEditFormStyles.scss';

export const UserEditForm: FC<UserEditFormProps> = ({ handleClose }) => {
  const { userData, setUserData } = useUserStore();
  const formik = useFormik<UserEditFormValues>({
    initialValues: {
      email: userData?.email,
      phone: userData?.phone,
      second_name: userData?.second_name,
      first_name: userData?.first_name,
    },
    validationSchema: userDataValidationSchema,
    onSubmit: async (formValues) => {
      if (
        formValues?.email &&
        formValues?.first_name &&
        formValues?.phone &&
        formValues?.second_name
      ) {
        const values = {
          email: formValues.email,
          phone: formValues.phone,
          second_name: formValues.second_name,
          first_name: formValues.first_name,
        };
        try {
          const data = await User.updateUserData(values);
          setUserData?.(data);
          handleClose();
        } catch (error) {
          console.error(error);
        }
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className='user-edit-form'>
      <Input
        name='first_name'
        value={formik.values.first_name}
        onChange={formik.handleChange}
        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
        helperText={formik.touched.first_name && formik.errors.first_name}
        className='user-edit-form__input'
        label='Имя'
        autoComplete='off'
      />
      <Input
        name='second_name'
        value={formik.values.second_name}
        onChange={formik.handleChange}
        error={formik.touched.second_name && Boolean(formik.errors.second_name)}
        helperText={formik.touched.second_name && formik.errors.second_name}
        className='user-edit-form__input'
        label='Фамилия'
        autoComplete='off'
      />
      <Input
        name='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        className='user-edit-form__input'
        label='E-mail'
        autoComplete='off'
      />
      <Input
        name='phone'
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
        className='user-edit-form__input'
        label='Телефон'
        autoComplete='off'
      />
      <Button label='Сохранить' type='submit' />
    </form>
  );
};
