import styled, { keyframes } from 'styled-components';
import {
  COLOR_LIGHT_GRAY,
  COLOR_GRAY_LIGHT_DARK,
} from 'Styled/Settings/colors';

export const PADDING_LEFT_MODAL_TITLE = 16;
export const HEIGHT_TITLE_HEIGHT = 50;

export const StyledModal = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  padding: 70px 0 30px;
  overflow: auto;
`;

const showDelay = keyframes`
  from {
    transform: translateY(-5%) scale(0.7); 
  }
  to {
    transform: translateY(0) scale(1);
  }
`;

export const StyledModalContainer = styled.div`
  animation: ${showDelay} 0.3s cubic-bezier(0.51, 0.5, 0.21, 0.99);
  ${(props) => props.autoHeight && 'height:100%;'}
  background: #fbfbfb;
  top: 70px;
  margin: 0 auto;
  border-radius: 1px;
  box-shadow: 0px 0px 10px 1px #a3a3a3;
  overflow: hidden;
  
  .modal-content__with-title{
    width: 100%;
    height: calc(100% - ${HEIGHT_TITLE_HEIGHT}px);
  }
  @media (min-width: 768px) {
    width: calc(100% - 150px);
    right: 75px;
  }
  @media (min-width: 1200px) {
    width: calc(100% - 420px);
    right: 210px;
  }
  @media (max-width: 768px) {
    width: 100%;
    right: 0;
  }
`;

export const StyledModalTitle = styled.div`
  background: #fdfdfdee;
  height: ${HEIGHT_TITLE_HEIGHT}px;
  line-height: ${HEIGHT_TITLE_HEIGHT}px;
  padding: 0px ${PADDING_LEFT_MODAL_TITLE}px;
  border-bottom: 1px solid #fefefe;
  box-shadow: 1px 1px 1px #eee;
  & i {
    font-size: 1.3em;
    margin-right: 8px;
  }
  & h1 {
    display: inline;
    font-size: 1.25em;
    font-weight: 400;
  }
`;


export const StyleRemoveIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0px;
  color: ${COLOR_LIGHT_GRAY};
  cursor: pointer;
  &:hover {
    color: ${COLOR_GRAY_LIGHT_DARK};
  }
`;

export const ModalTitleContainer = styled.div`
  position: relative;
`;
