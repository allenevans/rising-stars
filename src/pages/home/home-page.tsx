import React, { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import type { Filter } from '../../components';
import {
  filterFromQueryStringParams,
  FilterInput,
  filterToQueryStringParams,
  LoadingSpinner,
  RepositoryCard,
} from '../../components';
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
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const allSearchParams = new URLSearchParams(searchParams);
  allSearchParams.delete(QueryStringParams.favourites);
  const favouriteSearchParams = new URLSearchParams(searchParams);
  favouriteSearchParams.set(QueryStringParams.favourites, 'true');

  const showFavourites = searchParams.get(QueryStringParams.favourites) === 'true';

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

  const handleLanguageSelect = useCallback(
    (language: string) => {
      const existing = searchParams.getAll('lang');

      if (existing.includes(language)) {
        return;
      }

      const nextSearchParams = new URLSearchParams(searchParams);
      nextSearchParams.append('lang', language);

      navigate(`?${nextSearchParams}`);
    },
    [navigate, searchParams],
  );

  const handleFilterChange = useCallback(
    (filter: Filter) => {
      navigate(`?${filterToQueryStringParams(filter)}`, { replace: true });
    },
    [navigate],
  );

  const filter = filterFromQueryStringParams(searchParams);

  const favouriteIds = useSelector(favouriteIdsSelector, shallowEqual);
  const favourites = useSelector(favouritesSelector({ languages: filter.languages }), shallowEqual);
  const { data, error, isLoading, isError } = useRepositoriesQuery({
    languages: filter.languages,
    since: filter.since?.toISOString().substring(0, 10),
  });
  const repositories = (showFavourites ? favourites : data?.items) ?? ([] as GithubRepository[]);

  const showLoadingSpinner = !data && isLoading && !showFavourites;

  return (
    <StandardLayout className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link to="/"> 💫 Rising stars</Link>
        </h1>

        {isError && <ErrorSummary error={(error as { error?: string })?.error ?? 'Unknown'} />}

        {!isError && (
          <NavBar
            className={styles.navBar}
            tabs={[
              { url: `/?${allSearchParams}`, name: 'All', selected: !showFavourites },
              { url: `/?${favouriteSearchParams}`, name: 'Favourites', selected: showFavourites },
            ]}
          />
        )}

        {!isError && (
          <FilterInput
            className={styles.filterInput}
            filter={filterFromQueryStringParams(searchParams)}
            onChange={handleFilterChange}
          />
        )}

        {showLoadingSpinner && <LoadingSpinner className={styles.loading} />}

        {!isLoading && (
          <ul className={styles.repositoryCardList}>
            {repositories.map((repository) => {
              const checked = favouriteIds.includes(repository.id);

              return (
                <li key={repository.id}>
                  <RepositoryCard
                    favourite={checked}
                    repository={repository}
                    onFavourite={handleFavourite}
                    onLanguageSelect={handleLanguageSelect}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </StandardLayout>
  );
};
