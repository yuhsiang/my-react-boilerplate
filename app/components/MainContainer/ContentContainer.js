import styled from 'styled-components';

import {
  COLOR_GRAY_DARK,
  COLOR_LIGHTER_GRAY,
  INSIGHT_GREEN,
} from 'Styled/Settings/colors';

import {
  PAGE_VIEW_PADDING,
  CONTAINER_SPACING,
} from 'components/PageContainer';

export const HEIGHT_ACTION_CONTAINER = 40;
export const HEIGHT_PAGE_HEADER = 50;
export const HEIGHT_PAGINATION = 50;
export const HEIGHT_TITLE_CONTAINER = 45;

export const StyledPageHeader = styled.div`
  ${PAGE_VIEW_PADDING}
  height: ${HEIGHT_PAGE_HEADER}px;
  line-height: ${HEIGHT_PAGE_HEADER}px;
  box-shadow: 0px 1px 1px 0px ${COLOR_LIGHTER_GRAY};
  & h2 {
    color: ${COLOR_GRAY_DARK};
    font-weight: 500;
  }
`;

export const StyledActionContainer = styled.div`
  position: relative;
  padding: 0 ${CONTAINER_SPACING}px;
  .aud-action-wrapper {
    display: flex;
    position: relative;
    height: 100%;
    line-height: ${HEIGHT_ACTION_CONTAINER}px;
    &:after{
      content: '';
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      border-bottom: 1px solid ${COLOR_LIGHTER_GRAY};
    }
  }
`;

export const stylePagination = {
  height: `${HEIGHT_PAGINATION}px`,
  overflow: 'hidden',
};

const mixinActiveButton = (props) => {
  if (props.inactive) {
    return 'color: #bbb;text-shadow: 1px 1px 1px #efefef;';
  }
  if (props.activate) {
    return `
      font-size: 1.1em;
      font-weight: 500;
      color: black;`;
  }
  if (props.active) {
    return `
      background: white;
      font-size: 1.1em;
      font-weight: 500;
      color: black;`;
  }
  return `
    &:hover{
      background: white;
      font-weight: 500;
      color: black;
    }
  `;
};

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
  margin-right: ${CONTAINER_SPACING}px;
  padding: 0;
  ${(props) => mixinActiveButton(props)}
  &:focus{
      outline: none;
    }
  .button-icon{
    font-size: 1.1em;
    margin-right: 5px;
  }
  .button-icon-right{
    font-size: 1.1em;
    margin-left: 5px;
  }
  .horizontal-flip {
    transform: scaleX(-1);
  }
  .notification-balloon {
    color: white;
    background: ${INSIGHT_GREEN};
    width: 16px;
    height: 16px;
    border-radius: 100%;
    font-size: 11px;
    margin: 0px 5px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledDebugCell = styled.div`
  cursor: help;
  color: #4183C4;
`;
