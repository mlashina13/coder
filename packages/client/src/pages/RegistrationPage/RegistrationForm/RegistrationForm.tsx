import { useFormik } from 'formik';
import * as yup from 'yup';

import { Button, Input } from '../../../components';
import { Auth } from '../../../services';
import { useUserStore } from '../../../stores';

import './registrationFormStyles.scss';

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
  email: yup
    .string()
    /** проверка через регулярное выражение электронной почты */
    .matches(/^([\w.-])+@([\w.-])+\.([A-Za-z]{2,4})$/, {
      message: 'Почта должна быть написана на латинице, допускаются цифры и спецсимволы',
    })
    /** указываем на обязательность электронной почты */
    .required('Введите e-mail'),
  first_name: yup
    .string()
    /** проверка через регулярное выражение имени */
    .matches(/^[А-ЯA-Z][a-zа-я-]{1,20}$/g, {
      message:
        'Имя должно быть написано на латинице или кириллице, первая буква заглавная, без цифр и спецсимволов',
    })
    /** указываем на обязательность имени */
    .required('Введите имя'),
  second_name: yup
    .string()
    /** проверка через регулярное выражение фамилии */
    .matches(/^[А-ЯA-Z][a-zа-я-]{1,20}$/g, {
      message:
        'Фамилия должна быть написана на латинице или кириллице, первая буква заглавная, без цифр и спецсимволов',
    })
    /** указываем на обязательность фамилии */
    .required('Введите фамилию'),
  phone: yup
    .string()
    /** проверка через регулярное выражение телефона */
    .matches(/^((8|\+7)[-]?)?(\(?\d{3}\)?[-]?)?[\d-]{7,10}$/, {
      message:
        'Телефон должен быть от 10 до 15 символов, состоять из цифр, может начинается с плюса',
    })
    /** указываем на обязательность телефона */
    .required('Введите телефон'),
  passwordRepeat: yup
    .string()
    /** проверка через регулярное выражение пароля */
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/g, {
      message:
        'Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и одна цифра',
    })
    /** указываем на обязательность пароля */
    .required('Введите пароль'),
});

export const RegistrationForm = () => {
  const { setUserData } = useUserStore();
  const formik = useFormik({
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
        console.error('Введите корректный пароль');
      } else {
        Auth.registration({ ...rest, password }).then(() => {
          Auth.getAuthUser().then((data) => setUserData?.(data));
        });
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
      <Button label='Регистрация' type='submit' />
    </form>
  );
};
