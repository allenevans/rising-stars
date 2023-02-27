import { QueryStringParams } from '../../types';
import type { Filter } from './filter';

export const filterToQueryStringParams = (filter: Filter): URLSearchParams => {
  const params = new URLSearchParams();

  if (filter.favourites) {
    params.set(QueryStringParams.favourites, 'true');
  }

  if (filter.languages) {
    filter.languages.forEach((lang) => params.append(QueryStringParams.lang, lang));
  }

  if (filter.since) {
    params.set(QueryStringParams.since, filter.since.toISOString().substring(0, 10));
  }

  return params;
};
export const filterFromQueryStringParams = (params: URLSearchParams): Filter => {
  const parsedSince = Date.parse(params.get(QueryStringParams.since) ?? '');

  const filter: Filter = {
    favourites: params.get(QueryStringParams.favourites) === 'true',
    languages: params.getAll(QueryStringParams.lang),
    since: isNaN(parsedSince) ? undefined : new Date(parsedSince),
  };

  return filter;
};

export const parseStringToFilter = (str: string): Filter => {
  const filter: Filter = { favourites: false, languages: [] };

  const favourites = str.match(/favourites/i);
  const languages = str.matchAll(/language[:=]\s?(\S+)/gi);
  const since = Date.parse(str.match(/since[:=]\s?(\S+)/i)?.[1] ?? '');

  filter.favourites = !!favourites;
  filter.languages = Array.from(languages).map(([, lang]) => lang);
  filter.since = isNaN(since) ? undefined : new Date(since);

  return filter;
};

export const uniqueFilter = <T>(value: T, index: number, self: T[]) => self.indexOf(value) === index;

export const mergeFilters = (filter1?: Filter, filter2?: Filter): Filter => {
  if (!filter1 && !filter2) {
    return { favourites: false };
  }

  if (!filter1 && filter2) {
    return filter2;
  }

  if (!filter2 && filter1) {
    return filter1;
  }

  return {
    favourites: filter2?.favourites ?? false,
    since: filter2?.since ?? filter1?.since,
    languages: [...(filter1?.languages ?? []), ...(filter2?.languages ?? [])].filter(uniqueFilter),
  };
};
