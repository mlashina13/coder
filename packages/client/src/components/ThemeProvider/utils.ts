import { THEMES } from '../../constants';

export const getTheme = () => {
  const theme = `${window?.localStorage?.getItem('theme')}`;
  if (Object.values(THEMES).includes(theme)) return theme;

  const userMedia = window.matchMedia('(prefers-color-scheme: light)');
  if (userMedia.matches) return THEMES.LIGHT;

  return THEMES.DARK;
};
