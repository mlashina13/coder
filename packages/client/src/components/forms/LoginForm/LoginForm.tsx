import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Input } from '../../common';
import { LoginData } from '../../../types/common';
import { validationSchema } from './validationSchema';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { findLocation, login } from '../../../services';
import { ROUTER_URLS } from '../../../constants';
import './loginFormStyles.scss';

/**
 * Форма авторизации
 */
export const LoginForm = () => {
  const { loading, currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate(ROUTER_URLS.Main);
    }
  }, [currentUser]);

  const formik = useFormik<LoginData>({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(login(values));
      dispatch(findLocation());
    },
    validateOnBlur: false,
  });

  return (
    <form onSubmit={formik.handleSubmit} className='login-form'>
      <Input
        name='login'
        variant='filled'
        value={formik.values.login}
        onChange={formik.handleChange}
        error={formik.touched.login && Boolean(formik.errors.login)}
        helperText={formik.touched.login && formik.errors.login}
        className='login-form__input requiredField'
        label='Логин'
        autoComplete='off'
        size='small'
      />
      <Input
        name='password'
        variant='filled'
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        type='password'
        className='login-form__input requiredField'
        label='Пароль'
        autoComplete='off'
        size='small'
      />
      <Button label='Войти' type='submit' disabled={loading} />
    </form>
  );
};
