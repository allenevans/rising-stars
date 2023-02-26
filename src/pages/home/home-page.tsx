import React, { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { LoadingSpinner, RepositoryCard } from '../../components';
import { ErrorSummary } from '../../components/error-summary/error-summary';
import { StandardLayout } from '../../components/standard-layout';
import { addFavourite, removeFavourite } from '../../redux/favourites-slice';
import { useRepositoriesQuery } from '../../redux/github-search-api';
import type { GithubRepository } from '../../types';
import { favouriteIdsSelector } from './favourite-ids-selector';

import * as styles from './home-page.module.css';

export const HomePage: React.FC = () => {
  const { data, error, isLoading, isError } = useRepositoriesQuery({});
  const favouriteIds = useSelector(favouriteIdsSelector, shallowEqual);

  const dispatch = useDispatch();

  const handleFavourite = useCallback(
    (repository: GithubRepository, selected: boolean) => {
      if (selected) {
        dispatch(addFavourite(repository));
      } else {
        dispatch(removeFavourite(repository.id));
      }
    },
    [dispatch],
  );

  return (
    <StandardLayout className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>💫 Rising stars</h1>

        {!data && isLoading && <LoadingSpinner className={styles.loading} />}
        {isError && <ErrorSummary error={(error as { error?: string })?.error ?? 'Unknown'} />}

        {data && (
          <ul>
            {data.items.map((repository) => {
              const checked = favouriteIds.includes(repository.id);

              return (
                <li key={repository.id}>
                  <RepositoryCard favourite={checked} repository={repository} onFavourite={handleFavourite} />
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </StandardLayout>
  );
};
