import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedAlert } from '.';

const ErrorMsgWrapper = styled.div`
  position: relative;
  color: #a94442;
  background-color: #f2dede;
  border: 1px solid #ebccd1;
  border-radius: 3px;
  padding: 20px 0;
`;

const ErrorMsgCloseButton = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  cursor: pointer;
  transform: translate(0, -50%);
  font-size: 15px;
  font-weight: bold;
  &:after {
    content: '×';
  }
  &:hover {
    color: #7d1815;
  }
  &:hover {
    color: #980400;
  }
`;

const AlertMsg = (props) => {
  const {
    children,
    onDismiss,
  } = props;
  return (
    <FormattedAlert>
      <ErrorMsgWrapper>
        {children}
        <ErrorMsgCloseButton onClick={() => onDismiss()} />
      </ErrorMsgWrapper>
    </FormattedAlert>
  );
};

AlertMsg.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onDismiss: PropTypes.func,
};

AlertMsg.defaultProps = {
  children: null,
  onDismiss: () => {},
};

export default AlertMsg;
