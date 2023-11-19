import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Error } from '../../components/Error';
import { Error400Icon } from '../../assets';
import type { Error400PageProps } from './Error400PageProps';
import './error400PageStyles.scss';

// TODO: заглушка вместо редиректа на главную временная
export const Error400Page: FC<Error400PageProps> = ({
  code = 404,
  description = 'Страница не существует',
}) => (
  <Box className='error-page'>
    <Error
      onClick={() => console.log('Редирект на главную')}
      icon={<Error400Icon />}
      code={code}
      description={description}
      buttonText='Вернуться на главную'
    />
  </Box>
);
