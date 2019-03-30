import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  COLOR_GRAY,
  COLOR_GRAY_LIGHT_DARK,
  INSIGHT_GREEN,
} from 'Styled/Settings/colors';

const StyledInputBox = styled.div`
  border: 1px solid ${COLOR_GRAY};
  margin-top: 5px;
  position: relative;
  .custom-modal__input-box {
    width: 100%;
    border-radius: 0px;
    padding: 8px 10px;
    outline: none;
    color: ${COLOR_GRAY_LIGHT_DARK};
  }
  .custom-modal__input-check-icon {
    color: ${COLOR_GRAY_LIGHT_DARK};
    margin-right: 10px;
    position: absolute;
    right: 5px;
    transform: translateY(-50%);
    top: 50%;
  }
  .value-modify {
    color: ${INSIGHT_GREEN};
  }
  .input-value-duplicate {
    color: #ff4471;
  }
  .fa-times-circle {
    margin-left: 5px;
  }
`;

const styleInputBoxColor = (isModified, foundDuplicateName) => {
  if (foundDuplicateName) {
    return 'input-value-duplicate';
  }
  return isModified
    ? 'value-modify'
    : '';
};

const InputBox = ({ id, name, isModified, foundDuplicateName, borderColor, handleOnChange }) => (
  <StyledInputBox className={`${borderColor}`}>
    <input
      data-id={id}
      className={`custom-modal__input-box ${styleInputBoxColor(isModified, foundDuplicateName)}`}
      type="text"
      value={name}
      onChange={handleOnChange}
    />
    {
      foundDuplicateName
        ? <span className="custom-modal__input-check-icon input-value-duplicate">
          已有相同名稱
          <i className="fa fa-times-circle" />
        </span>
        : name && <i className={`fa fa-check-circle custom-modal__input-check-icon ${styleInputBoxColor(isModified, foundDuplicateName)}`} />
    }
  </StyledInputBox>
);

InputBox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  isModified: PropTypes.bool,
  foundDuplicateName: PropTypes.bool,
  borderColor: PropTypes.string,
  handleOnChange: PropTypes.func,
};

InputBox.defaultProps = {
  id: '',
  name: '',
  isModified: false,
  foundDuplicateName: false,
  borderColor: '',
  handleOnChange: () => { },
};

export default InputBox;
