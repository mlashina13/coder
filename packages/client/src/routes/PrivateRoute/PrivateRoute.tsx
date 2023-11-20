import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTER_URLS } from '../../constants';

export const PrivateRoute: React.FC = () => {
  // TODO: get token from server & validation it
  const token = '123';
  return !token ? <Navigate to={ROUTER_URLS.Login} /> : <Outlet />;
};
