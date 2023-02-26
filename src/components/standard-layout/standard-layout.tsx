import React from 'react';
import cn from 'classnames';
import * as styles from './standard-layout.module.css';

export interface StandardLayoutProps {
  children: React.ReactNode;
  className?: string;
  pageTitle?: string;
}

const PAGE_TITLE_SUFFIX = 'Page Site Title Here';

export function StandardLayout({ children, className, pageTitle }: StandardLayoutProps) {
  if (typeof document !== 'undefined') {
    document.title = pageTitle ? `${pageTitle} | ${PAGE_TITLE_SUFFIX}` : PAGE_TITLE_SUFFIX;
  }

  return <div className={cn(styles.standardLayout, className)}>{children}</div>;
}

StandardLayout.defaultProps = {};
