import React from 'react';
import cn from 'classnames';
import * as styles from './error-summary.module.css';

export interface ErrorSummaryProps {
  className?: string;

  error: string;
}

export const ErrorSummary: React.FC<ErrorSummaryProps> = ({ className, error }: ErrorSummaryProps) => {
  return (
    <div className={cn(styles.errorSummary, className)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={styles.icon}>
        <g id="Layer_2" data-name="Layer 2">
          <g id="layer_1-2" data-name="layer 1">
            <path
              className="cls-1"
              d="M42 48H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6h36a6 6 0 0 1 6 6v36a6 6 0 0 1-6 6zM6 2a4 4 0 0 0-4 4v36a4 4 0 0 0 4 4h36a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4z"
            />
            <path
              className="cls-1"
              d="M4 4h2v2H4zM8 4h2v2H8zM12 4h2v2h-2zM1 8h46v2H1zM31 41a1 1 0 0 1-.71-.29L24 34.41l-6.29 6.3a1 1 0 0 1-1.42 0l-5-5a1 1 0 0 1 0-1.42l6.3-6.29-6.3-6.29a1 1 0 0 1 0-1.42l5-5a1 1 0 0 1 1.42 0l6.29 6.3 6.29-6.3a1 1 0 0 1 1.42 0l5 5a1 1 0 0 1 0 1.42L30.41 28l6.3 6.29a1 1 0 0 1 0 1.42l-5 5A1 1 0 0 1 31 41zm-7-9a1 1 0 0 1 .71.29l6.29 6.3L34.59 35l-6.3-6.29a1 1 0 0 1 0-1.42l6.3-6.29L31 17.41l-6.29 6.3a1 1 0 0 1-1.42 0L17 17.41 13.41 21l6.3 6.29a1 1 0 0 1 0 1.42L13.41 35 17 38.59l6.29-6.3A1 1 0 0 1 24 32z"
            />
          </g>
        </g>
      </svg>
      <h2>Something went wrong</h2>
      <p>{error}</p>
      <a href="/" className={styles.refresh}>
        Refresh
      </a>
    </div>
  );
};
