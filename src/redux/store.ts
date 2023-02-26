import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { githubSearchApi } from './github-search-api';

export const store = configureStore({
  reducer: {
    [githubSearchApi.reducerPath]: githubSearchApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubSearchApi.middleware),
});

setupListeners(store.dispatch);
