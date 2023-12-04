import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Divider } from '@mui/material';
import { Error } from '../../Error';
import { LogoIcon, UnexpectedErrorIcon } from '../../../assets';
import { ErrorPlugProps } from './ErrorPlugProps';
import './errorPlugStyles.scss';

/**
 * Компонент отображения ошибки выполнения приложения
 */
export const ErrorPlug: FC<ErrorPlugProps> = (props) => {
  const { error, errorInfo } = props;
  const navigate = useNavigate();

  return (
    <Box className='error-plug'>
      <Box className='error-plug__header'>
        <LogoIcon />
        CODER
      </Box>
      <Divider className='error-plug__divider' />
      <Box className='error-plug-error-wrapper'>
        <Error
          icon={<UnexpectedErrorIcon />}
          className='error-plug-error-wrapper__error'
          title='Произошла непредвиденная ошибка'
          description={
            <Box>
              {error}
              {error && <br />}
              {errorInfo && <details style={{ whiteSpace: 'pre-wrap' }}>{errorInfo}</details>}
            </Box>
          }
          actionText='Обновить страницу'
          onActionClick={() => navigate(0)}
        />
      </Box>
    </Box>
  );
};
