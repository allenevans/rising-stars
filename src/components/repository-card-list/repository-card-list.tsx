import React from 'react';
import type { GithubRepository } from '../../types';
import { RepositoryCard } from '../repository-card';
import type { RepositoryCardProps } from '../repository-card';
import * as styles from './repository-card-list.module.css';

export interface RepositoryCardListProps {
  favouriteIds: number[];

  onFavourite?: RepositoryCardProps['onFavourite'];

  onLanguageSelect?: RepositoryCardProps['onLanguageSelect'];

  repositories: GithubRepository[];
}

export const RepositoryCardList: React.FC<RepositoryCardListProps> = ({
  favouriteIds,
  onFavourite,
  onLanguageSelect,
  repositories,
}: RepositoryCardListProps) => {
  return (
    <ul className={styles.repositoryCardList}>
      {repositories.map((repository) => {
        const checked = favouriteIds.includes(repository.id);

        return (
          <li key={repository.id}>
            <RepositoryCard
              favourite={checked}
              repository={repository}
              onFavourite={onFavourite}
              onLanguageSelect={onLanguageSelect}
            />
          </li>
        );
      })}
      {!repositories.length && (
        <li>
          <div className={styles.noResults}>
            <span>No repositories found</span>
          </div>
        </li>
      )}
    </ul>
  );
};
