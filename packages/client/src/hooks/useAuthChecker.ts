import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { checkAuth } from '../services';
import { ROUTER_URLS } from '../constants';
import { useAppDispatch, useAppSelector } from './reduxToolkitHooks';

/**
 * Набор URL страниц аутентификации
 */
const AUTH_ROUTES: Array<string> = [ROUTER_URLS.Login, ROUTER_URLS.Registration];

export const useAuthChecker = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Эффект, проверяющий,
   * авторизован ли пользователь
   */
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  /**
   * Эффект, отвечающий за редирект пользователя
   */
  useEffect(() => {
    if (!currentUser && !AUTH_ROUTES.includes(location.pathname)) {
      navigate(ROUTER_URLS.Login);
    }
    if (currentUser && AUTH_ROUTES.includes(location.pathname)) {
      navigate(ROUTER_URLS.Main);
    }
  }, [currentUser, location]);
};
