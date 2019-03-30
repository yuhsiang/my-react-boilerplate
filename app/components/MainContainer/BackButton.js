import styled from 'styled-components';

import {
  COLOR_GRAY_DARKEN,
} from 'Styled/Settings/colors';

const BackButton = styled.i`
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  color: ${COLOR_GRAY_DARKEN};
  font-size: 28px;
  cursor: pointer;
  &:hover{
    opacity: 0.65;
  }
  &:active{
    opacity: 0.9;
  }
`;
export default BackButton;
