import React from 'react';
import { useAppSelector } from '../../hooks';
import { ThemeProviderProps } from './ThemeProviderProps';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useAppSelector((state) => state.themes.actualTheme);

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return children;
};
