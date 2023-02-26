import type { ChangeEventHandler } from 'react';
import React, { useCallback } from 'react';
import type { GithubRepository } from '../../types';
import { Tag } from '../tag';

import * as styles from './repository-card.module.css';

export interface RepositoryCardProps {
  favourite: boolean;

  onFavourite?: (repository: GithubRepository, selected: boolean) => void;

  repository: GithubRepository;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  favourite,
  onFavourite,
  repository,
}: RepositoryCardProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      onFavourite?.(repository, event.target.checked);
    },
    [onFavourite, repository],
  );

  return (
    <div className={styles.card}>
      <label className={styles.checkbox}>
        {favourite ? '❤️' : '🤍'}
        <input type="checkbox" defaultChecked={favourite} onChange={handleChange} />
      </label>
      <dl className={styles.detailContainer}>
        <div className={styles.detail}>
          <dt className={styles.title}>
            <a href={repository.html_url}>{repository.full_name} </a>
          </dt>
          <dd className={styles.description}>{repository.description}</dd>
          {repository.language && (
            <dd>
              <Tag>{repository.language}</Tag>
            </dd>
          )}
        </div>
        <dd className={styles.stars}>{repository.stargazers_count} ⭐️</dd>
      </dl>
    </div>
  );
};
