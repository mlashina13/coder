/* eslint-disable react/jsx-no-useless-fragment */
import { FC, PropsWithChildren } from 'react';
import { useAuthChecker } from '../../hooks';

/**
 * Компонент-обертка, проверяющий, авторизован ли пользователь
 */
export const AuthChecker: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  useAuthChecker();

  return <>{children}</>;
};
