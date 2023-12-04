import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Error } from '../../components/Error';
import { Error400Icon } from '../../assets';
import type { Error400PageProps } from './Error400PageProps';
import { ROUTER_URLS } from '../../constants';
import './error400PageStyles.scss';

/**
 * Страница ошибки 404
 */
export const Error400Page: FC<Error400PageProps> = ({
  code = 404,
  description = 'Страница не существует',
  buttonLabel = 'Вернуться на главную',
}) => {
  const navigate = useNavigate();

  return (
    <Box className='error-page'>
      <Error
        onActionClick={() => navigate(ROUTER_URLS.Main)}
        icon={<Error400Icon />}
        code={code}
        description={description}
        actionText={buttonLabel}
      />
    </Box>
  );
};
