import React from 'react';
import * as styles from './error-fallback.module.css';

export interface ErrorFallbackProps {
  error?: Error | null;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = (props: ErrorFallbackProps) => {
  return (
    <div className={styles.fallback}>
      <div>
        <p>Something went wrong</p>
        <br />
        <p>{props.error?.message}</p>
        <br />
        <p>Please try refreshing</p>
      </div>
    </div>
  );
};
