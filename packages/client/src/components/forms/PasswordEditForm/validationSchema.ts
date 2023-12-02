import * as yup from 'yup';

/**
 * Схема валидации формы изменения пароля
 */
export const validationSchema = yup.object({
  oldPassword: yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/g, {
      message:
        'Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и одна цифра',
    })
    .required('Введите пароль'),
  newPassword: yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/g, {
      message:
        'Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и одна цифра',
    })
    .required('Введите пароль'),
  repeatNewPassword: yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/g, {
      message:
        'Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и одна цифра',
    })
    .oneOf([yup.ref('newPassword')], 'ведите кооректно повтор нового пароля!')
    .required('Введите пароль'),
});
