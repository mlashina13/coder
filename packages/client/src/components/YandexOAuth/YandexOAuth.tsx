import { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getServiceId, yandexLogin } from '../../services';
import { getCurrentUrl, getYandexAuthUrl } from '../../utils';

export const YandexOAuth: React.FC = () => {
  const { serviceId } = useAppSelector((state) => state.oauth);
  const locationState = useLocation().state;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!serviceId) {
      dispatch(getServiceId());
    }
  }, [dispatch, serviceId]);

  useEffect(() => {
    if (locationState?.code) {
      dispatch(
        yandexLogin({
          redirect_uri: getCurrentUrl(),
          code: locationState.code,
        })
      );
    }
  }, [dispatch, locationState]);

  const yandexAuthUrl = useMemo(() => (serviceId ? getYandexAuthUrl(serviceId) : ''), [serviceId]);

  return serviceId ? (
    <Link className='btn' to={yandexAuthUrl}>
      Войти с помощью Яндекса
    </Link>
  ) : null;
};
