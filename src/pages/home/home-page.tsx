import React, { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import type { Filter } from '../../components';
import { NavBar, StandardLayout } from '../../components';
import {
  filterFromQueryStringParams,
  FilterInput,
  filterToQueryStringParams,
  LoadingSpinner,
  RepositoryCardList,
} from '../../components';
import { ErrorSummary } from '../../components/error-summary/error-summary';
import { addFavourite, removeFavourite } from '../../redux/favourites-slice';
import { useRepositoriesQuery } from '../../redux/github-search-api';
import type { GithubRepository } from '../../types';
import { QueryStringParams } from '../../types';
import { favouriteIdsSelector, favouritesSelector } from './favourites-selectors';

import * as styles from './home-page.module.css';

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
      const existing = searchParams.getAll(QueryStringParams.lang);

      if (existing.find((lang) => lang.toLowerCase === language.toLowerCase)) {
        return;
      }

      const nextSearchParams = new URLSearchParams(searchParams);
      nextSearchParams.append(QueryStringParams.lang, language);

      navigate(`?${nextSearchParams}`);
    },
    [navigate, searchParams],
  );

  const handleFilterChange = useCallback(
    (filter: Filter) => {
      const params = filterToQueryStringParams(filter);

      navigate(`?${params}`, { replace: true });
    },
    [navigate],
  );

  const filter = filterFromQueryStringParams(searchParams);

  const favouriteIds = useSelector(favouriteIdsSelector, shallowEqual);
  const favourites = useSelector(favouritesSelector({ languages: filter.languages }), shallowEqual);
  const { data, error, isError, isFetching } = useRepositoriesQuery({
    languages: filter.languages,
    since: filter.since?.toISOString().substring(0, 10),
  });
  const apiError = error as { error?: string } & Error;
  const repositories = (showFavourites ? favourites : data?.items) ?? ([] as GithubRepository[]);

  const showLoadingSpinner = isFetching && !showFavourites;
  const showRepositoryList = showFavourites || (!isError && !isFetching);
  const showError = isError && !showFavourites;

  return (
    <StandardLayout className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link to="/"> 💫 Rising stars</Link>
        </h1>

        <NavBar
          className={styles.navBar}
          tabs={[
            { url: `/?${allSearchParams}`, name: 'All', selected: !showFavourites },
            { url: `/?${favouriteSearchParams}`, name: 'Favourites', selected: showFavourites },
          ]}
        />

        {showError && <ErrorSummary error={apiError.error ?? apiError.message ?? 'Unknown'} />}

        {!isError && (
          <FilterInput
            className={styles.filterInput}
            filter={filterFromQueryStringParams(searchParams)}
            onChange={handleFilterChange}
          />
        )}

        {showLoadingSpinner && <LoadingSpinner className={styles.loading} />}

        {showRepositoryList && (
          <RepositoryCardList
            favouriteIds={favouriteIds}
            repositories={repositories}
            onFavourite={handleFavourite}
            onLanguageSelect={handleLanguageSelect}
          />
        )}
      </main>
    </StandardLayout>
  );
};
