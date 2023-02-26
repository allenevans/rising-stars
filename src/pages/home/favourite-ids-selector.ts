import type { RootState } from '../../redux/store';

export const favouriteIdsSelector = (state: RootState): number[] => state.favourites.map(({ id }) => id);
