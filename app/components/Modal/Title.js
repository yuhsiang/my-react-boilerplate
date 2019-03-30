import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  StyledModalTitle,
  ModalTitleContainer,
  StyleRemoveIconWrapper,
} from './Styled';

class Title extends Component {
  static propTypes = {
    dataSource: PropTypes.string,
    handleOnCancel: PropTypes.func,
  }
  static defaultProps = {
    dataSource: '',
    handleOnCancel: () => { },
  }
  render() {
    const {
      dataSource,
      handleOnCancel,
    } = this.props;
    return (
      <StyledModalTitle>
        <ModalTitleContainer>
          <h1>
            {dataSource}
          </h1>
          <StyleRemoveIconWrapper onClick={handleOnCancel}>
            <i className="fa fa-times"></i>
          </StyleRemoveIconWrapper>
        </ModalTitleContainer>
      </StyledModalTitle>
    );
  }
}

export default Title;
