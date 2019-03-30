import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Layout, Button } from 'antd';

import {
  getPage,
} from '@containers/MainPage/Provider/actions';

import {
  makeSelectPrevLink,
  makeSelectNextLink,
} from '@containers/MainPage/Provider/selectors';

const { Footer } = Layout;

const StyledFooter = styled(Footer)`
  display: flex;
  justify-content: space-between;
`;

class FooterScreen extends React.Component {
  static propTypes = {
    prevLink: PropTypes.string,
    nextLink: PropTypes.string,
    fetchPage: PropTypes.func,
  }
  handlePrevPage = () => {
    const {
      prevLink,
      fetchPage,
    } = this.props;
    fetchPage(prevLink);
  }

  handleNextPage = () => {
    const {
      nextLink,
      fetchPage,
    } = this.props;
    fetchPage(nextLink);
  }
  render() {
    const {
      prevLink,
      nextLink,
    } = this.props;

    const nextDisable = !nextLink;
    const prevDisable = !prevLink;

    return (
      <StyledFooter>
        <Button onClick={this.handlePrevPage} disabled={prevDisable}>上一頁</Button>
        <p>
          @my boilerplate
        </p>
        <Button onClick={this.handleNextPage} disabled={nextDisable}>下一頁</Button>
      </StyledFooter>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  prevLink: makeSelectPrevLink(),
  nextLink: makeSelectNextLink(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPage: (url) => dispatch(getPage(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FooterScreen);
