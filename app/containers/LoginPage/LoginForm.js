
import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Field, reduxForm, propTypes } from 'redux-form/immutable';

// import history from 'utils/history';
import { FullButton } from 'components/Button';
import { ActionIcon } from 'components/FormCard/FormRightActions';
import InfoInputField from 'components/InfoInputField';

import messages from './messages';

const ActionContainer = styled.div`
  margin-top: 2.5rem;
`;

const required = (value) => (value ? undefined : '請輸入');

const LoginForm = (props) => {
  const {
    submitting,
  } = props;
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        label="Email"
        type="email"
        name="email"
        component={InfoInputField}
        placeholder="Email"
        validate={[required]}
      />
      <Field
        label="密碼"
        name="password"
        component={InfoInputField}
        type="password"
        placeholder="••••••••••"
        validate={[required]}
      />
      <ActionContainer>
        <FullButton
          type="submit"
          disabled={submitting}
          size={FullButton.SIZE_LARGE}
        >
          {/* <ActionIcon className="fa fa-user" /> */}
          <FormattedMessage
            {...messages.loginMessage}
          />
          {submitting && <ActionIcon className="fa fa-circle-o-notch fa-spin fa-fw" />}
        </FullButton>
      </ActionContainer>
    </form>
  );
};

LoginForm.propTypes = {
  ...propTypes,
};

export default reduxForm({ form: 'loginForm' })(LoginForm);
