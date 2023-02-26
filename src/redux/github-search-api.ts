import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GithubRepository, GithubRepositorySearchResponse } from '../types';

const API_BASE_ENDPOINT = 'https://api.github.com/search/repositories?q=created:%3E2017-01-10&sort=stars&order=desc';

export const githubSearchApi = createApi({
  reducerPath: 'repositories',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_ENDPOINT,
  }),
  endpoints: (builder) => ({
    repositories: builder.query<GithubRepositorySearchResponse, string>({
      query: () => '',
      transformResponse: (response: GithubRepositorySearchResponse) => {
        return {
          ...response,
          items: response.items.map((item: GithubRepository) => ({
            id: item.id,
            full_name: item.full_name,
            description: item.description,
            html_url: item.html_url,
            language: item.language,
            stargazers_count: item.stargazers_count,
          })),
        };
      },
    }),
  }),
});

export const { useRepositoriesQuery } = githubSearchApi;
