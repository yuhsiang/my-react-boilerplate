import styled from 'styled-components';


const SPACE_HEADER = 30;

export const StyledHeader = styled.div`
  .header__wrapper{
    padding: 0 ${SPACE_HEADER}px;
  }
  .header__action-right{
    float: right;
    display: flex;
    i{
      font-size: 16px;
      font-weight: bold;
      color: white;
      line-height: 62px;
    }
  }
`;

export const UserDropdown = styled.div`
  font-size: 1.1em;
  color: #ffffff;
  font-weight: 500;
  cursor: pointer;
`;
