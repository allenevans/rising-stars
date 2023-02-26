import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage, LoadingPage, NotFoundPage } from './pages';

export function AppRouter() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
