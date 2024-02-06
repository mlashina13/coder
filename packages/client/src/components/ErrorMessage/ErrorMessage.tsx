/* eslint-disable no-undef */
import { FC, useEffect, useState } from 'react';
import { Alert, AlertTitle, Box, Slide } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { resetError } from '../../store/slices/errorSlice';
import './errorMessageStyles.scss';

/**
 * Компонент отображения глобальной ошибки
 */
export const ErrorMessage: FC = () => {
  const { error } = useAppSelector((state) => state.error);
  const dispatch = useAppDispatch();

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  /**
   * Автозакрытие ошибки
   */
  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(resetError());
    }, 3000);
    setTimeoutId(id);
    return () => {
      clearTimeout(id);
    };
  }, [error, resetError, dispatch]);

  /**
   * Обработчик закрытия ошибки
   */
  const closeHandler = () => {
    dispatch(resetError());
    clearTimeout(timeoutId);
  };

  return null;

  // return (
  //   <Box className='error-message'>
  //     <Slide in={!!error} timeout={600}>
  //       <Alert severity='error' className='error-message__alert' onClose={closeHandler}>
  //         <AlertTitle>Произошла ошибка!</AlertTitle>
  //         {error}
  //       </Alert>
  //     </Slide>
  //   </Box>
  // );
};
