import { useFormik } from 'formik';
import * as yup from 'yup';

import { Button, Input } from '../../../components';
import { Auth } from '../../../services';
import { useUserStore } from '../../../stores';

import './loginFormStyles.scss';

/** схема валидации */
const validationSchema = yup.object({
  login: yup
    .string()
    /** проверка через регулярное выражение логина */
    .matches(/^[a-zA-Z0-9-_]{3,20}$/g, {
      message:
        'Логин должен быть от 3 до 20 символов, написан латиницей, допускаются цифры, дефис и нижнее подчёркивание',
    })
    /** указываем на обязательность логина */
    .required('Введите логин'),
  password: yup
    .string()
    /** проверка через регулярное выражение пароля */
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/g, {
      message:
        'Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и одна цифра',
    })
    /** указываем на обязательность пароля */
    .required('Введите пароль'),
});

/** форма авторизации */
export const LoginForm = () => {
  const { setUserData } = useUserStore();
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      Auth.signIn(values).then(() => {
        Auth.getAuthUser().then((data) => setUserData?.(data));
      });
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
      <Button label='Войти' type='submit' />
    </form>
  );
};
