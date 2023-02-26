import type { PayloadAction } from '@reduxjs/toolkit';
import { createListenerMiddleware, createSlice } from '@reduxjs/toolkit';
import type { GithubRepository } from '../types';
import { LocalStorageSync } from '../utils';

const initialState: GithubRepository[] = [];
const LOCAL_STORAGE_FAVOURITES_KEY = 'favourites';

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState:
    LocalStorageSync.getObject<GithubRepository[]>(LOCAL_STORAGE_FAVOURITES_KEY, {
      defaultValue: initialState,
      suppressError: true,
    }) ?? initialState,
  reducers: {
    add: (state, action: PayloadAction<GithubRepository>) => {
      state.push(action.payload);
    },
    remove(state, action: PayloadAction<GithubRepository['id']>) {
      const existing = state.findIndex(({ id }) => id === action.payload);
      if (~existing) {
        state.splice(existing, 1);
      }
    },
  },
});

const persistOnAdd = createListenerMiddleware();
persistOnAdd.startListening({
  actionCreator: favouritesSlice.actions.add,
  effect: async (action, listenerApi) => {
    const state = (listenerApi.getState() ?? { favourites: [] }) as { favourites: GithubRepository[] };
    LocalStorageSync.setObject(LOCAL_STORAGE_FAVOURITES_KEY, state.favourites);
  },
});

const persistOnRemove = createListenerMiddleware();
persistOnRemove.startListening({
  actionCreator: favouritesSlice.actions.remove,
  effect: async (action, listenerApi) => {
    const state = (listenerApi.getState() ?? { favourites: [] }) as { favourites: GithubRepository[] };
    LocalStorageSync.setObject(LOCAL_STORAGE_FAVOURITES_KEY, state.favourites);
  },
});

export const { add: addFavourite, remove: removeFavourite } = favouritesSlice.actions;
export const favouritesReducer = favouritesSlice.reducer;

export const favouritesMiddleware = [persistOnAdd.middleware, persistOnRemove.middleware];
