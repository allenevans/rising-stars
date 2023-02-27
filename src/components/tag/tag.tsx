import type { ReactNode } from 'react';
import React from 'react';
import cn from 'classnames';
import * as styles from './tag.module.css';

export interface TagProps {
  children: ReactNode;

  className?: string;

  onClick?: () => void;
}

export const Tag: React.FC<TagProps> = (props: TagProps) => {
  const { children, className, onClick } = props;
  return (
    <div className={cn(styles.tag, { [styles.withOnclick]: !!onClick }, className)} onClick={onClick}>
      {children}
    </div>
  );
};
