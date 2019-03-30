// /import React from 'react';
import styled from 'styled-components';

import { up } from 'styled-breakpoints';

import {
  BREAK_POINT_XL,
} from 'Styled/Settings/constants';

export default styled.div`
  width: 100%;
  ${up(BREAK_POINT_XL)} {
    width: 360px;
  }
`;
