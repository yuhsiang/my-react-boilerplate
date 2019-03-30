import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  INSIGHT_GREEN,
} from 'Styled/Settings/colors';

const RADIUS = 40;

const rotate = keyframes`
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
`;

const StyledOrbit = styled.div`
  display: inline-block;
  text-align: center;
  position: relative;
  .loader-text {
    font-size: 12px;
    font-weight: bold;
  }
  .loader-circle {
    position: absolute;
    left: 50%;
    top: 50%;
    width: ${RADIUS * 2}px;
    height: ${RADIUS * 2}px;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px #f3f3f3;
    margin-left: -${RADIUS}px;
    margin-top: -${RADIUS}px;
  }
  .loader-circle-orbit {
    position: absolute;
    left: 50%;
    top: 50%;
    width: ${RADIUS}px;
    height: ${RADIUS * 2}px;
    margin-left: -${RADIUS}px;
    margin-top: -${RADIUS}px;
    overflow: hidden;
    transform-origin: ${RADIUS}px ${RADIUS}px;
    -webkit-mask-image: -webkit-linear-gradient(top, rgba(0,0,0,1), rgba(0,0,0,0));
    animation: ${rotate} 1.2s infinite linear;

    .loader-circle-line {
      width: ${RADIUS * 2}px;
      height: ${RADIUS * 2}px;
      border-radius: 50%;
      box-shadow: inset 0 0 0 3px ${INSIGHT_GREEN};
    }
  }
`;

const Orbit = () => (
  <StyledOrbit>
    <span className="loader-text">Loading</span>
    <div className="loader-circle"></div>
    <div className="loader-circle-orbit">
      <div className="loader-circle-line" />
    </div>
  </StyledOrbit>
);

export default Orbit;
