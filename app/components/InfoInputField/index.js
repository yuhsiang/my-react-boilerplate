/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { FormInput } from 'components/FormCard';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { ActionIcon } from 'components/FormCard/FormRightActions';

import {
  StyledErrorField,
  StyledNoticeContainer,
  StyledLabel,
} from './Styled';

const FieldContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const labelStyle = {
  fontWeight: 'bold',
  fontSize: '1.1em',
};

const renderField = ({
  input,
  label,
  placeholder,
  type,
  showValidated,
  meta: { touched, error, warning, asyncValidating },
}) => {
  const successStyle = {
    marginLeft: '5px',
    color: '#008800',
    fontSize: '1.2em',
  };
  const success = input && input.value && !error && !warning && !asyncValidating && showValidated;

  return (
    <FieldContainer>
      <StyledLabel>
        <label htmlFor={label} style={labelStyle}>{label}</label>
      </StyledLabel>
      <FormInput
        id={label}
        autoComplete={'on'}
        {...input}
        placeholder={placeholder}
        type={type}
      />
      <StyledNoticeContainer>
        {success && <ActionIcon style={successStyle} className="fa fa-check-circle" />}
        {asyncValidating && <ActionIcon className="fa fa-circle-o-notch fa-spin fa-fw" />}
        {touched &&
          ((error && <StyledErrorField>{error}</StyledErrorField>) ||
            (warning && <StyledErrorField>{warning}</StyledErrorField>))}
      </StyledNoticeContainer>
    </FieldContainer>
  );
};

renderField.propTypes = {
  input: PropTypes.object,
  showValidated: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
};

renderField.defaultProps = {
  showValidated: false,
  input: {},
  placeholder: '',
  label: '',
  type: '',
  meta: {},
};

export default renderField;
