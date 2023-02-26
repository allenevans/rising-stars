import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import { ErrorFallback } from './error-fallback';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactElement;
}

interface ErrorBoundaryState {
  error?: Error | null;
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return React.cloneElement(this.props.fallback, { error: this.state.error });
      }

      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
