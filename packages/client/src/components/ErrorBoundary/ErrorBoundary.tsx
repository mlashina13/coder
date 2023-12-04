/* eslint-disable react/destructuring-assignment */
import { Component, ErrorInfo, PropsWithChildren } from 'react';
import { ErrorPlug } from './ErrorPlug';
import { ErrorBoundaryState } from './ErrorBoundaryProps';

/**
 * Предохранитель
 */
class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined };
  }

  /**
   * Событие перехвата ошибки
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    return this.state.errorInfo ? (
      <ErrorPlug
        error={this.state.error && `${this.state.error.name}: ${this.state.error.message}`}
        errorInfo={this.state.errorInfo?.componentStack ?? ''}
      />
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
