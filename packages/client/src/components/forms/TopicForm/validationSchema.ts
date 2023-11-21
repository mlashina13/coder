import * as yup from 'yup';

/**
 * Схема валидации
 */
export const validationSchema = yup.object({
  theme: yup.string().required('Введите название'),
});
