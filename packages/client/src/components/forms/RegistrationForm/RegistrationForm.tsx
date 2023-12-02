import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Input } from '../../common';
import { RegistrationData } from '../../../types/common';
import { validationSchema } from './validationSchema';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { registration } from '../../../services';
import { ROUTER_URLS } from '../../../constants';
import './registrationFormStyles.scss';

/**
 * Модель, описывающая данные формы
 */
interface RegistrationFormData extends RegistrationData {
  passwordRepeat: string;
}

/**
 * Компонент формы регистрации
 */
export const RegistrationForm: FC = () => {
  const { loading, currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate(ROUTER_URLS.Main);
    }
  }, [currentUser]);

  const formik = useFormik<RegistrationFormData>({
    initialValues: {
      login: '',
      password: '',
      email: '',
      passwordRepeat: '',
      phone: '',
      second_name: '',
      first_name: '',
    },
    validationSchema,
    onSubmit: ({ password, passwordRepeat, ...rest }) => {
      if (password !== passwordRepeat) {
        formik.setFieldError('passwordRepeat', 'Пароль и повторенный пароль не совпадают!');
      } else {
        dispatch(registration({ ...rest, password }));
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='regstration-form'>
      <Input
        name='first_name'
        value={formik.values.first_name}
        onChange={formik.handleChange}
        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
        helperText={formik.touched.first_name && formik.errors.first_name}
        className='regstration-form__input requiredField'
        label='Имя'
        autoComplete='off'
        size='small'
        variant='filled'
      />
      <Input
        name='second_name'
        value={formik.values.second_name}
        onChange={formik.handleChange}
        error={formik.touched.second_name && Boolean(formik.errors.second_name)}
        helperText={formik.touched.second_name && formik.errors.second_name}
        className='regstration-form__input requiredField'
        label='Фамилия'
        autoComplete='off'
        size='small'
        variant='filled'
      />
      <Input
        name='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        className='regstration-form__input requiredField'
        label='E-mail'
        autoComplete='off'
        size='small'
        variant='filled'
      />
      <Input
        name='phone'
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
        className='regstration-form__input requiredField'
        label='Телефон'
        autoComplete='off'
        size='small'
        variant='filled'
      />
      <Input
        name='login'
        value={formik.values.login}
        onChange={formik.handleChange}
        error={formik.touched.login && Boolean(formik.errors.login)}
        helperText={formik.touched.login && formik.errors.login}
        className='regstration-form__input requiredField'
        label='Логин'
        autoComplete='off'
        size='small'
        variant='filled'
      />
      <Input
        name='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        type='password'
        className='regstration-form__input requiredField'
        label='Пароль'
        autoComplete='off'
        size='small'
        variant='filled'
      />
      <Input
        name='passwordRepeat'
        value={formik.values.passwordRepeat}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.passwordRepeat && Boolean(formik.errors.passwordRepeat)}
        helperText={formik.touched.passwordRepeat && formik.errors.passwordRepeat}
        type='password'
        className='regstration-form__input requiredField'
        label='Подтвердите пароль'
        autoComplete='off'
        size='small'
        variant='filled'
      />
      <Button label='Регистрация' type='submit' disabled={loading} />
    </form>
  );
};
