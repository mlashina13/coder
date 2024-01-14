import React from 'react';
import { getTheme, updateTheme } from '../../services/userThemeService';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ThemeProviderProps } from './ThemeProviderProps';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!currentUser?.id) return;
    dispatch(getTheme(currentUser?.id));
  }, [currentUser]);

  return children;
};
