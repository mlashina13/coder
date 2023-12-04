import { ErrorInfo } from 'react';

/**
 * Описание стейта ErrorBoundary
 */
export interface ErrorBoundaryState {
  /**
   * Ошибка
   */
  error?: Error;

  /**
   * Информация об ошибке
   */
  errorInfo?: ErrorInfo;
}
