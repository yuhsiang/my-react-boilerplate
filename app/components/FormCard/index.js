import styled from 'styled-components';

import { COLOR_LIGHT_GRAY, COLOR_GRAY } from 'Styled/Settings/colors';

export default styled.div`
  border-radius: 0.5rem;
  border: 1px solid ${COLOR_LIGHT_GRAY};
  width: 90%;
  max-width: 500px;
  min-height: 500px;
  text-align: center;
  margin: 5rem auto 0 auto;
  padding: 1rem 0px 1rem 0px;
  background: white;
`;

export const FormInput = styled.input`
  width: 100%;
  height: 4rem;
  font-size: 1.1rem;
  border-radius: 0.25rem;
  border: 1px solid ${COLOR_GRAY};
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

export const FormTitle = styled.div`
  margin-bottom: 10px;
  text-align: center;
`;

export const FormattedAlert = styled.div`
  width: 50%;
  margin-right: auto;
  margin-left: auto;
`;
