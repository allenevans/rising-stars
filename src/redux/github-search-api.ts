import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GithubRepository, GithubRepositorySearchResponse } from '../types';

const ONE_DAY_MS = 1000 * 60 * 60 * 24;
const ONE_WEEK = 7 * ONE_DAY_MS;

const SINCE_DEFAULT = new Date(Date.now() - ONE_WEEK).toISOString().substring(0, 10);

const API_BASE_ENDPOINT = `https://api.github.com/search`;

type GithubSearchApiParams = {
  /**
   * Date since repositories were created in the format YYYY-MM-DD.
   * Defaults to past 7 days;
   */
  since?: string;
};

export const githubSearchApi = createApi({
  reducerPath: 'repositories',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_ENDPOINT,
  }),
  endpoints: (builder) => ({
    repositories: builder.query<GithubRepositorySearchResponse, GithubSearchApiParams>({
      query: (params) => {
        const url = new URL(`${API_BASE_ENDPOINT}/repositories?&sort=stars&order=desc`);

        url.searchParams.set('q', `created:>${params?.since ?? SINCE_DEFAULT}`);

        return url.toString();
      },
      transformResponse: (response: GithubRepositorySearchResponse) => {
        return {
          ...response,
          items: response.items.map((item: GithubRepository) => ({
            id: item.id,
            full_name: item.full_name,
            description: item.description?.substring(0, 1000),
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
