import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  COLOR_LIGHT_GRAY,
  BUTTON_ACTION_BORDER,
} from 'Styled/Settings/colors';

const StyledFooter = styled.div`
  width: 100%;
  height: 100%;
  background: ${COLOR_LIGHT_GRAY};
  height: 60px;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .custom-modal__button {
    background: ${BUTTON_ACTION_BORDER};
    color: white;
    display: inline;
    padding: 5px 45px;
    outline: none;
    cursor: pointer;
    &:hover {
      background: ${BUTTON_ACTION_BORDER}87;
    }
  }
`;


const Button = ({
  onClick,
  children,
}) => (
  <button className="custom-modal__button" onClick={onClick}>{children}</button>
);
Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
};

/**
 * Footer for modal
 * previous version only contains one button, in the newer version,
 * user can add multiple buttons in children
 */
const Footer = ({
  onSubmit,
  children,
}) => (
  <StyledFooter>
    {
      !children && <button className="custom-modal__button" onClick={onSubmit}>確定</button>
    }
    {children}
  </StyledFooter>
);

Footer.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.any,
};

Footer.defaultProps = {
  onSubmit: () => { },
  children: null,
};

Footer.Button = Button;

export default Footer;
