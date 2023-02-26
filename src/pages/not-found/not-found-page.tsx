import React from 'react';
import { Link } from 'react-router-dom';
import { StandardLayout } from '../../components';
import { NotFoundIcon } from './not-found-icon';
import * as styles from './not-found-page.module.css';

export const NotFoundPage: React.FC = () => {
  return (
    <StandardLayout pageTitle="Page not found">
      <main className={styles.main}>
        <div>
          <NotFoundIcon className={styles.notFoundIcon} />
          <h3 className={styles.message}>Page not found</h3>
          <Link to="/">Go back</Link>
        </div>
      </main>
    </StandardLayout>
  );
};
