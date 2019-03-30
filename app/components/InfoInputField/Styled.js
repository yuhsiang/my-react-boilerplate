import styled from 'styled-components';

export const StyledErrorField = styled.div`
  border: none;
  text-align: right;
  font-weight: bold;
  color: #700;
  &:before {
    font-family: FontAwesome;
    content: "\f05a";
    display: inline-block;
    padding-right: 3px;
  }
`;

export const StyledNoticeContainer = styled.div`
  display: inline;
`;

export const StyledLabel = styled.div`
  text-align: left;
`;

