import React from 'react';
import cn from 'classnames';

import * as styles from './loading-spinner.module.css';

export interface LoadingSpinnerProps {
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = (props) => {
  return (
    <div className={cn(styles.loadingEllipsis, props.className)} data-testid="loading">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
