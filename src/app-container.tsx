import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { AppRouter } from './app-router';
import { ErrorBoundary } from './components';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export function AppContainer() {
  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </Router>
    </Provider>
  );
}
