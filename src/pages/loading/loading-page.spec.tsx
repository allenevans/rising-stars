import { render } from '@testing-library/react';
import React, { Suspense } from 'react';
import { axe } from 'jest-axe';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { LoadingPage } from './loading-page';

const mountComponent = (params: { url: string }) => {
  return render(
    <Router basename="/" initialEntries={[params.url]}>
      <Suspense fallback={<div />}>
        <Routes>
          <Route path="*" element={<LoadingPage />} />
        </Routes>
      </Suspense>
    </Router>,
  );
};

describe('LoadingPage', () => {
  it('does not have any accessibility issues', async () => {
    const result = mountComponent({ url: '/' });

    expect(await axe(result.container.innerHTML)).toHaveNoViolations();
    result.unmount();
  });
});
