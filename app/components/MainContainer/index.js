import styled from 'styled-components';

import {
  FEATURE_TITLE_HEIGHT,
  FEATURE_TITLE_TEXT_HEIGHT,
} from 'Styled/Settings/global';

import {
  COLOR_GRAY,
  COLOR_LIGHTER_GRAY,
} from 'Styled/Settings/colors';

export const PADDING_CONTAINER = 15;

export const StyledFeatureScreen = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  .feature__title-container{
    position: relative;
    height: ${FEATURE_TITLE_HEIGHT}px;
    padding: 10px 0 10px ${PADDING_CONTAINER}px;

    .feature__title-icon{
      display: inline-block;
      width: ${FEATURE_TITLE_TEXT_HEIGHT}px;
      height: ${FEATURE_TITLE_TEXT_HEIGHT}px;
      background-image: url(${(props) => props.icon || ''});
    }
    .feature__title-icon-awesome-font{
      display: inline-block;
      color: ${(props) => props.color || COLOR_GRAY};
      font-size: ${FEATURE_TITLE_TEXT_HEIGHT}px;
    }
    .feature_title-text{
      display: inline-block;
      height: ${FEATURE_TITLE_TEXT_HEIGHT}px;
      line-height: ${FEATURE_TITLE_TEXT_HEIGHT}px;
      vertical-align: top;
      font-weight: 500;
      font-size: 1.2em;
      margin-left: 10px;
      color: ${(props) => props.color || COLOR_GRAY};
    }
    &:after {
      content: '';
      width: calc(100% - ${PADDING_CONTAINER * 2}px);
      position: absolute;
      bottom: 0;
      left: ${PADDING_CONTAINER}px;
      border-bottom: 1px solid ${COLOR_LIGHTER_GRAY};
    }
  }
  .feature__content-container{
    width: 100%;
    height: calc(100% - ${FEATURE_TITLE_HEIGHT}px);
    .feature__content-with-tab {
      width: 100%;
      height: calc(100% - ${FEATURE_TITLE_HEIGHT}px);
    }
    .feature__content{
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
`;

export const ScrollableFeatureContent = styled.div`
  height: 100%;
  overflow: auto;
`;
