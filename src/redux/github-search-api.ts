import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GithubRepositorySearchResponse } from '../types';

const API_BASE_ENDPOINT = 'https://api.github.com/search/repositories?q=created:%3E2022-01-10&sort=stars&order=desc';

export const githubSearchApi = createApi({
  reducerPath: 'repositories',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_ENDPOINT,
  }),
  endpoints: (builder) => ({
    repositories: builder.query<GithubRepositorySearchResponse, string>({
      query: () => '',
    }),
  }),
});

export const { useRepositoriesQuery } = githubSearchApi;
