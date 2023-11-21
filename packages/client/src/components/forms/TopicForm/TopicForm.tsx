import { FC } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import { Button, Input } from '../../common';
import { TopicFormProps } from './TopicFormProps';
import { validationSchema } from './validationSchema';
import './topicFormStyles.scss';

/**
 * Объект полей формы
 */
interface TopicFormFields {
  theme: string;
}

/**
 * Форма редактирования топика
 */
export const TopicForm: FC<TopicFormProps> = (props) => {
  const { onCancel, onFormSubmit, theme = '' } = props;

  const formik = useFormik<TopicFormFields>({
    initialValues: {
      theme,
    },
    validationSchema,
    onSubmit: (values) => onFormSubmit(values.theme ?? ''),
    validateOnBlur: false,
  });

  return (
    <form onSubmit={formik.handleSubmit} className='topic-form'>
      <Input
        label='Название'
        name='theme'
        autoComplete='off'
        value={formik.values.theme}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.theme && Boolean(formik.errors.theme)}
        helperText={formik.touched.theme && formik.errors.theme}
      />
      <Box className='topic-form__actions'>
        <Button label='Сохранить' type='submit' />
        <Button label='Отмена' variant='outlined' onClick={onCancel} />
      </Box>
    </form>
  );
};
