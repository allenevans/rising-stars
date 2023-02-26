import type { ReactNode } from 'react';
import React from 'react';
import styles from './tag.module.css';

export interface TagProps {
  children: ReactNode;
}

export const Tag: React.FC<TagProps> = (props: TagProps) => {
  const { children } = props;
  return <div className={styles.tag}>{children}</div>;
};
