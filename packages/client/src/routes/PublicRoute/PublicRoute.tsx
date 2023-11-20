import React from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';
import { ROUTER_URLS } from '../../constants';

type PublicRouteProps = RouteProps;

export const PublicRoute: React.FC<PublicRouteProps> = () => {
  // TODO: get token from server & validation it
  const token = '123';
  const localStorageToken = '';

  if (token && localStorageToken) return <Navigate to={ROUTER_URLS.Main} />;

  return <Outlet />;
};
