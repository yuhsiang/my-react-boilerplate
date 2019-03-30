import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  COLOR_LIGHT_GRAY,
  COLOR_GRAY_DARK,
  COLOR_GRAY_LIGHT_DARK,
} from 'Styled/Settings/colors';

const StyledHeader = styled.div`
    width: 100%;
    height: 50px;
    background: ${COLOR_LIGHT_GRAY};
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
  .custom-modal__title {
    line-height: 50px;
    font-weight: 500;
  }
  .custom-modal__info-icon {
    margin-left: 5px;
    color: ${COLOR_GRAY_DARK};
  }
  .custom-modal__close-btn {
    position: absolute;
    right: 20px;
    font-size: 1.5em;
    color: ${COLOR_GRAY_LIGHT_DARK};
    cursor: pointer;
  }
`;

const Header = ({ title, onClose }) => (
  <StyledHeader>
    <span className="custom-modal__title">
      {title}
      <i className="fa fa-info-circle custom-modal__info-icon" />
    </span>
    <i role="presentation" className="fa fa-times-circle custom-modal__close-btn" onClick={onClose} />
  </StyledHeader>
);

Header.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};

Header.defaultProps = {
  title: '',
  onClose: () => { },
};

export default Header;
