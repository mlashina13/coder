import { FC } from 'react';
import { Box } from '@mui/material';
import { Error } from '../../components/Error';
import { Error500Icon } from '../../assets';
import type { Error500PageProps } from './Error500PageProps';
import './error500PageStyles.scss';

/**
 * Страница ошибок 500
 */
export const Error500Page: FC<Error500PageProps> = ({
  code = 500,
  description = 'Произошла ошибка сервера',
  buttonLabel = 'Повторить попытку',
}) => (
  <Box className='error-page'>
    <Error
      onActionClick={async () => console.log('Повтор запроса')}
      icon={<Error500Icon />}
      code={code}
      description={description}
      actionText={buttonLabel}
    />
  </Box>
);
