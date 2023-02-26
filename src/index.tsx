import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppContainer } from './app-container';

import './styles/reset.css';
import './styles/spacing.css';
import './styles/theme.css';
import './styles/typography.css';

const container = document.getElementById('app');

if (!container) {
  /* eslint-disable-next-line no-console */
  console.error('Failed to locate root app element');
}

const root = createRoot(container as Element);
root.render(<AppContainer />);
