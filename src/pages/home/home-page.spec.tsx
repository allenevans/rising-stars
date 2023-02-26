import React, { Suspense } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';
import { useRepositoriesQuery } from '../../redux/github-search-api';
import { HomePage } from './home-page';

jest.mock('../../redux/github-search-api');
(useRepositoriesQuery as jest.Mock).mockReturnValue({ data: { items: [] } });

const mountComponent = (params: { url: string }) => {
  return render(
    <Router basename="/" initialEntries={[params.url]}>
      <Suspense fallback={<div />}>
        <Routes>
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </Router>,
  );
};

describe('HomePage', () => {
  it('renders the page', () => {
    mountComponent({ url: `/` });

    waitFor(() => {
      expect(screen.queryAllByText('Home page')).toBeInTheDocument();
    });
  });

  it('does not have any accessibility issues', async () => {
    const result = mountComponent({ url: '/' });

    expect(await axe(result.container.innerHTML)).toHaveNoViolations();
    result.unmount();
  });
});
