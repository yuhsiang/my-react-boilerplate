import { css, keyframes } from 'styled-components';

export const fadeKeyFrames = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeInDefaultProps = {
  animationLength: 0.8,
};

export const fadeIn = (props = fadeInDefaultProps) => css`
  animation: ${fadeKeyFrames} ${props.fadeInDefaultProps}s cubic-bezier(0.51,0.5,0.21,0.99);
`;

