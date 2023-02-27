import type { RootState } from '../../redux/store';

export const favouriteIdsSelector = (state: RootState): number[] => state.favourites.map(({ id }) => id);

export const favouritesSelector = (state: RootState) =>
  [...state.favourites].sort((a, z) => z.stargazers_count - a.stargazers_count);
