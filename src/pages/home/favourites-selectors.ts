import type { RootState } from '../../redux/store';

type FavouritesFilter = {
  languages?: string[];
};

export const favouriteIdsSelector = (state: RootState): number[] => state.favourites.map(({ id }) => id);

export const favouritesSelector = (filter?: FavouritesFilter) => (state: RootState) =>
  state.favourites
    .filter((repository) => !filter?.languages?.length || filter.languages.includes(repository.language ?? ''))
    .sort((a, z) => z.stargazers_count - a.stargazers_count);
