/**
 * Useful for Non-Authorization page
 * Page includes bridgewell-dmp theme background, logo and is responsive
 * just render stuff you like in the content
 *
 * Example In Entry Page
 *
 *  <GreetingWrapper>
 *     <Domain>
 *       {url}
 *     </Domain>
 *  </GreetingWrapper>
 */

import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { down, between } from 'styled-breakpoints';
import {
  BREAK_POINT_SM,
  BREAK_POINT_MD,
  BREAK_POINT_LG,
} from 'Styled/Settings/constants';
import { COLOR_GRAY_LIGHT_DARK } from 'Styled/Settings/colors';

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  overflow: hidden;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
`;

const Cover = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  .cover__logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 10rem;
    height: 84px;

    ${between(BREAK_POINT_MD, BREAK_POINT_LG)} {
      transform: translateX(-50%) scale(0.8);
    }
    ${between(BREAK_POINT_SM, BREAK_POINT_MD)} {
      transform: translateX(-50%) scale(0.7);
    }
    ${down(BREAK_POINT_SM)} {
      transform: translateX(-50%) scale(0.5);
    }
  }

  .cover__greeting {
    position: absolute;
    color: ${COLOR_GRAY_LIGHT_DARK};
    left: 50%;
    transform: translateX(-50%);
    top: 16rem;
    letter-spacing: 1px;
  }
  &:after{
    content: '';
    background-image: url("/DMP-bg.png");
    width: 100%;
    height: 780px;

    background-size: cover;
    background-position: center;
  }
`;

const Content = styled.div`
  display: flex;
  position: absolute;
  top: 350px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${between(BREAK_POINT_MD, BREAK_POINT_LG)} {
    width: 30%;
  }
  ${between(BREAK_POINT_SM, BREAK_POINT_MD)} {
    width: 30%
  }
  ${down(BREAK_POINT_SM)} {
    width: 20rem;
  }
`;

const GreetingWrapper = ({ children, title }) => (
  <Main>
    <Section>
      <Cover>
        <h1 className={'cover__greeting '}>{title}</h1>
      </Cover>

      <Content>
        {children}
      </Content>
    </Section>
  </Main>
);

GreetingWrapper.propTypes = {
  children: PropTypes.any,
  title: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.element,
    ]
  ),
};
GreetingWrapper.defaultProps = {
  children: '',
  title: '歡迎使用 Boilerplate',
};

export default GreetingWrapper;
