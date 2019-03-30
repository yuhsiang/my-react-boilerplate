import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Helmet } from 'react-helmet';
import {
  TitleMeta,
} from 'global-constants';

import GreetingWrapper from '@components/MainContainer/GreetingWrapper';
import GreetingFormWrapper from 'components/MainContainer/GreetingFormWrapper';
import LoginForm from './LoginForm';

import {
  fetchLogin,
} from './actions';

export const LoginPage = ({
  handleLoginClick,
}) => (
  <GreetingWrapper>
    <Helmet title={TitleMeta.app.login} />
    <GreetingFormWrapper>
      <LoginForm onSubmit={(payload) => handleLoginClick(payload)} />
    </GreetingFormWrapper>
  </GreetingWrapper>
);

LoginPage.propTypes = {
  handleLoginClick: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    handleLoginClick: (domain, payload) => dispatch(fetchLogin(domain, payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(LoginPage);
