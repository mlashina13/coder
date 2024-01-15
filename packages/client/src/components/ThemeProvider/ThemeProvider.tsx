import React, { useEffect } from 'react';
import { getTheme, updateTheme } from '../../services/userThemeService';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ThemeProviderProps } from './ThemeProviderProps';
import { LIGHT_THEME } from '../../constants';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.dataset.theme = localStorage.getItem('theme') || LIGHT_THEME;
  }, []);

  useEffect(() => {
    if (!currentUser?.id) {
      return;
    }
    dispatch(getTheme(currentUser?.id));
  }, [currentUser]);

  return children;
};
