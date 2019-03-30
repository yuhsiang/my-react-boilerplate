/**
 * Asynchronously loads the component for LoginPage
 */

import LoadingIndicator from 'components/LoadingIndicator';
import React, { lazy, Suspense } from 'react';
const LazyLoginPage = lazy(() => import('./index'));

export default () => (
  <Suspense fallback={<LoadingIndicator />}>
    <LazyLoginPage />
  </Suspense>
);

