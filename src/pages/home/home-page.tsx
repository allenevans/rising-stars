import React, { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { LoadingSpinner, RepositoryCard } from '../../components';
import { ErrorSummary } from '../../components/error-summary/error-summary';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { StandardLayout } from '../../components/standard-layout';
import { addFavourite, removeFavourite } from '../../redux/favourites-slice';
import { useRepositoriesQuery } from '../../redux/github-search-api';
import type { GithubRepository } from '../../types';
import { favouriteIdsSelector, favouritesSelector } from './favourites-selectors';

import * as styles from './home-page.module.css';

enum QueryStringParams {
  favourites = 'favourites',
}

export const HomePage: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { data, error, isLoading, isError } = useRepositoriesQuery({});
  const favouriteIds = useSelector(favouriteIdsSelector, shallowEqual);
  const favourites = useSelector(favouritesSelector, shallowEqual);

  const allSearchParams = new URLSearchParams(searchParams);
  allSearchParams.delete(QueryStringParams.favourites);
  const favouriteSearchParams = new URLSearchParams(searchParams);
  favouriteSearchParams.set(QueryStringParams.favourites, 'true');

  const showFavourites = searchParams.get(QueryStringParams.favourites) === 'true';
  const repositories = (showFavourites ? favourites : data?.items) ?? [];

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

        <NavBar
          className={styles.navBar}
          tabs={[
            { url: `/?${allSearchParams}`, name: 'All', selected: !showFavourites },
            { url: `/?${favouriteSearchParams}`, name: 'Favourites', selected: showFavourites },
          ]}
        />

        <ul>
          {repositories.map((repository) => {
            const checked = favouriteIds.includes(repository.id);

            return (
              <li key={repository.id}>
                <RepositoryCard favourite={checked} repository={repository} onFavourite={handleFavourite} />
              </li>
            );
          })}
        </ul>
      </main>
    </StandardLayout>
  );
};
