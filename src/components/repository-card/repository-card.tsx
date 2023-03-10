import type { ChangeEventHandler } from 'react';
import React, { useCallback } from 'react';
import type { GithubRepository } from '../../types';
import { Tag } from '../tag';

import * as styles from './repository-card.module.css';

export interface RepositoryCardProps {
  favourite: boolean;

  onFavourite?: (repository: GithubRepository, selected: boolean) => void;

  onLanguageSelect?: (language: string) => void;

  repository: GithubRepository;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  favourite,
  onFavourite,
  onLanguageSelect,
  repository,
}: RepositoryCardProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      onFavourite?.(repository, event.target.checked);
    },
    [onFavourite, repository],
  );

  const handleLanguageTagClick = useCallback(
    (language: string) => {
      onLanguageSelect?.(language);
    },
    [onLanguageSelect],
  );

  return (
    <div className={styles.card}>
      <label className={styles.checkbox}>
        {favourite ? '❤️' : '🤍'}
        <input type="checkbox" defaultChecked={favourite} onChange={handleChange} />
      </label>
      <div className={styles.detailContainer}>
        <dl className={styles.detail}>
          <dt className={styles.title}>
            <a href={repository.html_url} target="_blank" rel="noreferrer">
              {repository.full_name}
            </a>
          </dt>
          <dd className={styles.description}>{repository.description}</dd>
          {repository.language && (
            <dd>
              <Tag onClick={handleLanguageTagClick.bind(null, repository.language)}>{repository.language}</Tag>
            </dd>
          )}
        </dl>
        <div className={styles.stars}>{repository.stargazers_count} ⭐️</div>
      </div>
    </div>
  );
};
