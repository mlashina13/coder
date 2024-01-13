import { FC } from 'react';
import { AppRouter } from './routes/AppRouter';
import { ErrorBoundary, ThemeProvider } from './components';

document.documentElement.dataset.theme = 'light';

export const App: FC = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  </ErrorBoundary>
);
