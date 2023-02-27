import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { Router, Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { axe } from 'jest-axe';
import { act, render, screen, waitFor } from '@testing-library/react';
import { store } from '../../redux/store';
import { HomePage } from './home-page';

import mockData from '../../mocks/handlers/mock-search-repositories-response.json';

const mountComponent = (params: { url: string }, renderer: typeof render = render) => {
  const history = createMemoryHistory({
    initialEntries: [params.url],
  });

  const result = renderer(
    <Provider store={store}>
      <Router basename="/" navigator={history} location={params.url}>
        <Suspense fallback={<div />}>
          <Routes>
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>,
  );

  return {
    ...result,
    history,
  };
};

describe('HomePage', () => {
  it('renders the page', async () => {
    const { unmount } = mountComponent({ url: `/` });

    await waitFor(async () => {
      expect(screen.queryByText('💫 Rising stars')).toBeInTheDocument();
    });
    unmount();
  });

  it('does not have any accessibility issues', async () => {
    const result = mountComponent({ url: '/' });

    await act(() => {
      /* await dispatch to load data */
    });

    const html = result.container.innerHTML;
    result.unmount();

    expect(await axe(html)).toHaveNoViolations();
  });

  it('displays a list of repositories', async () => {
    const { unmount } = mountComponent({ url: `/` });

    await act(() => {
      /* await dispatch to load data */
    });

    await waitFor(async () => {
      expect(screen.queryAllByText(mockData.items[0].full_name)[0]).toBeInTheDocument();
    });
    unmount();
  });

  describe('navigation', () => {
    it('navigates to favourites view', async () => {
      const { history } = mountComponent({ url: `/` });

      const favouritesLink = screen.getByTestId('navbar-favourites');

      await userEvent.click(favouritesLink);

      expect(history.location.search).toEqual('?favourites=true');
    });

    it('navigates from favourites view to all view', async () => {
      const { history } = mountComponent({ url: `/?favourites=true` });

      const favouritesLink = screen.getByTestId('navbar-all');

      await userEvent.click(favouritesLink);

      expect(history.location.search).toEqual('');
    });
  });

  describe('filtering', () => {
    it('filters results by language', async () => {
      const { history, unmount, rerender } = mountComponent({ url: `/` });

      await act(() => {
        /* await dispatch to load data */
      });

      // check that we can see language tags for each repository
      await waitFor(async () => {
        expect(screen.getByText(mockData.items[0].language)).toBeInTheDocument();
        expect(screen.getByText(mockData.items[1].language)).toBeInTheDocument();
      });

      const filterLanguageTag = screen.getByText(mockData.items[0].language);
      await userEvent.click(filterLanguageTag);

      expect(history.location.search).toEqual('?lang=JavaScript');

      await act(() => {
        /* await dispatch to load data */
      });

      mountComponent({ url: '?lang=JavaScript' }, rerender as typeof render);

      await act(() => {
        /* await dispatch to load data */
      });

      // check that we can see language tags for each repository
      await waitFor(async () => {
        expect(screen.getByText(mockData.items[0].language)).toBeInTheDocument();
        expect(screen.queryByText(mockData.items[1].language)).not.toBeInTheDocument();
      });

      unmount();
    });
  });
});
