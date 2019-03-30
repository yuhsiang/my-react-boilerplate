import React, { Component } from 'react';
import PropTypes from 'prop-types';
import zIndices from 'Styled/Settings/zIndices';
import PortalComponent from '../../libs/PortalComponent';
import Title from './Title';

import {
  StyledModal,
  StyledModalContainer,
} from './Styled';

class Modal extends Component {
  static Title = Title
  static propTypes = {
    id: PropTypes.string,
    children: PropTypes.any,
    visible: PropTypes.bool,
    handleOnCancel: PropTypes.func,
    autoHeight: PropTypes.bool,
    customStyle: PropTypes.object,
  };
  static defaultProps = {
    id: null,
    title: '',
    children: '',
    visible: false,
    autoHeight: true,
    customStyle: null,
    handleOnCancel: () => {},
  };

  constructor(props) {
    super(props);
    this.handleOnOutsideClick = this.handleOnOutsideClick.bind(this);
  }

  handleOnOutsideClick(e) {
    const type = e.target.getAttribute('data-modal-layer');
    const {
      handleOnCancel,
    } = this.props;
    if (type) {
      e.stopPropagation();
      if (typeof handleOnCancel === 'function') {
        handleOnCancel();
      }
    }
  }

  render() {
    const { visible, id, autoHeight, customStyle } = this.props;
    return (
      <PortalComponent
        baseId={id}
        zIndex={zIndices.Z_FIXED_MODAL}
      >
        {visible && (
          <StyledModal
            data-modal-layer
            onClick={this.handleOnOutsideClick}
          >
            <StyledModalContainer autoHeight={autoHeight} style={customStyle}>
              {this.props.children}
            </StyledModalContainer>
          </StyledModal>
        )}
      </PortalComponent>
    );
  }
}

export default Modal;
