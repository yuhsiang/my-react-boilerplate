import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { createStructuredSelector } from 'reselect';

import { Layout, Row, Col } from 'antd';
import { generatePathWithParam } from '@app/utils/history';
import LoadingContainer from '@components/LoadingContainer';

import {
  getIndexPage,
} from '../Provider/actions';

import {
  makeSelectListState,
  makeSelectIsLoadingIndex,
  makeSelectHasLoadedIndex,
} from '../Provider/selectors';


import Header from './Header';
import BBSCard from './components/BBSCard';
import FooterScreen from '../Footer';
import routeConfig from '../routeConfig';

const grid = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 6,
};

const { Content } = Layout;

const MainScreen = ({
  isLoading,
  hasLoaded,
  fetchIndex,
  bbsList,
  handleSelectDetailPage,
}) => {
  useEffect(() => {
    if (!hasLoaded && !isLoading) {
      fetchIndex('beauty');
    }
  }, [fetchIndex, hasLoaded, isLoading]);
  return (
    <Layout>
      <Helmet title={'Beauty Boilerplate List'} />
      <Header />
      <Content>
        {isLoading && <LoadingContainer />}
        <Row
          type={'flex'}
          justify={'center'}
        >
          {bbsList && bbsList.map((item) => (
            <Col key={item.get('id')} {...grid}>
              <BBSCard
                handleSelectDetailPage={handleSelectDetailPage}
                dataSource={item}
              />
            </Col>
          ))}
        </Row>
      </Content>
      <FooterScreen />
    </Layout>
  );
};

MainScreen.propTypes = {
  isLoading: PropTypes.bool,
  hasLoaded: PropTypes.bool,
  fetchIndex: PropTypes.func,
  handleSelectDetailPage: PropTypes.func,
  bbsList: PropTypes.instanceOf(List),
};


export function mapDispatchToProps(dispatch) {
  return {
    fetchIndex: (category) => dispatch(getIndexPage(category)),
    handleSelectDetailPage: (page) => {
      const path = generatePathWithParam(routeConfig.beautyDetail, {
        pageId: page,
      });
      dispatch(push(path));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  bbsList: makeSelectListState(),
  isLoading: makeSelectIsLoadingIndex(),
  hasLoaded: makeSelectHasLoadedIndex(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(MainScreen);
