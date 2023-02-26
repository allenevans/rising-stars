import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { AppRouter } from './app-router';
import { ErrorBoundary } from './components';

export function AppContainer() {
  return (
      <Router>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </Router>
  );
}
