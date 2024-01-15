import { FC, useEffect } from 'react';
import { AppRouter } from './routes/AppRouter';
import { ErrorBoundary, ThemeProvider } from './components';
import { LIGHT_THEME } from './constants';

export const App: FC = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  </ErrorBoundary>
);
