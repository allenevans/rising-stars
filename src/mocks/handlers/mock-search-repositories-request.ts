import { rest } from 'msw';
import mockResponse from './mock-search-repositories-response.json';

export const mockSearchRepositoriesRequest = [
  rest.get('https://api.github.com/search/repositories', (req, res, ctx) => {
    const [, filterByLanguage] = req.url.searchParams.get('q')?.match(/language[:=](\S+)/) ?? [];

    const payload = {
      ...mockResponse,
      items: mockResponse.items.filter(({ language }) => !filterByLanguage || filterByLanguage === language),
    };

    return res(ctx.status(200), ctx.json(payload));
  }),
];
