import { FC } from 'react';
import { AppRouter } from './routes/AppRouter';
import { ErrorBoundary, ThemeProvider } from './components';
import { LIGHT_THEME } from './constants';

document.documentElement.dataset.theme = localStorage.getItem('theme') || LIGHT_THEME;

export const App: FC = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  </ErrorBoundary>
);
