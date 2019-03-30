/**
 * Asynchronously loads the component for MainPage
 */

import { lazy } from 'react';
import withSuspense from 'components/WaitingComponent';
const LazyMainPage = lazy(() => import('./index'));

export default withSuspense(LazyMainPage);

