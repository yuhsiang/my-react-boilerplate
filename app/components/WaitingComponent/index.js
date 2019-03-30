
import LoadingIndicator from 'components/LoadingIndicator';
import React, { Suspense } from 'react';

function withSuspense(Component) {
  return (props) => (
    <Suspense fallback={<LoadingIndicator />}>
      <Component {...props} />
    </Suspense>
  );
}
export default withSuspense;
