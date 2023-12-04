import { FC } from 'react';
import { AppRouter } from './routes/AppRouter';
import { ErrorBoundary } from './components';

export const App: FC = () => (
  <ErrorBoundary>
    <AppRouter />
  </ErrorBoundary>
);
