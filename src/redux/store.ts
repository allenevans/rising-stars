import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { favouritesMiddleware, favouritesReducer } from './favourites-slice';
import { githubSearchApi } from './github-search-api';

export const store = configureStore({
  reducer: {
    [githubSearchApi.reducerPath]: githubSearchApi.reducer,
    favourites: favouritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubSearchApi.middleware, ...favouritesMiddleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
