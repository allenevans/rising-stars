import React from 'react';
import { LoadingSpinner, StandardLayout } from '../../components';
import * as styles from './loading-page.module.css';

export const LoadingPage: React.FC = () => {
  return (
    <StandardLayout pageTitle="Page not found">
      <main className={styles.main}>
        <LoadingSpinner />
      </main>
    </StandardLayout>
  );
};
