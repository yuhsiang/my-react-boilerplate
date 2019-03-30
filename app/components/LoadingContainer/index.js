import React from 'react';
import { Spin } from 'antd';
import LoadingIndicator from '../LoadingIndicator';

import {
  StyledLoader,
} from './Styled';

const LoadingContainer = () => (
  <StyledLoader>
    <Spin />
  </StyledLoader>
);

export default LoadingContainer;
