import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import * as styles from './nav-bar.module.css';

export type NavTab = {
  name: string;

  selected?: boolean;

  url: string;
};

export interface NavBarProps {
  className?: string;

  tabs: NavTab[];
}

export const NavBar: React.FC<NavBarProps> = ({ className, tabs }: NavBarProps) => {
  return (
    <nav className={cn(styles.navBar, className)}>
      {tabs.map((tab) => (
        <Link
          key={tab.url}
          className={cn({ [styles.selected]: tab.selected })}
          to={tab.url}
          data-testid={`navbar-${tab.name.toLowerCase()}`}
        >
          {tab.name}
        </Link>
      ))}
    </nav>
  );
};
