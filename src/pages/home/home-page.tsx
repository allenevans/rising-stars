import React from 'react';
import { StandardLayout } from '../../components/standard-layout';

import * as styles from './home-page.module.css';

export const HomePage: React.FC = () => {
  return (
    <StandardLayout>
      <main className={styles.main}>
        <h1>Home page</h1>
      </main>
    </StandardLayout>
  );
};
