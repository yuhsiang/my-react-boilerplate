import React, { useCallback, useEffect }  from 'react';
import { Map } from 'immutable';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import styled from 'styled-components';
import {  up } from 'styled-breakpoints';
import LoadingContainer from '@components/LoadingContainer';

import {
  BREAK_POINT_LG,
} from '@app/Styled/Settings/constants';

import {
  fetchDetail,
} from '@containers/MainPage/Provider/actions';
import {
  makeSelectDetail,
  makeSelectIsLoadingDetail,
} from '@containers/MainPage/Provider/selectors';

import Header from '../MainScreen/Header';

import { Layout, Button, Row, Col, Icon } from 'antd';

import history from '@app/utils/history';
import routeConfig from '../routeConfig';

const Image = styled.img`
  width: 100%;
  padding: 0.5rem;
  ${up(BREAK_POINT_LG)} {
    width: 600px;
    margin: auto;
    padding: 1rem;
    display:block;
  }
`;

const MetaInfo = styled.div`
  padding: 0.5rem;
  margin-bottom: 1rem;
  background: #333333;
  color: white;
  .meta-info__title{
    margin: 0 0.5rem;
    font-size: 1.1rem;
    font-weight: 500;
  }
  .meta-info__name{
    margin: 0 0.5rem;
    color: #13be13;
  }
  .meta-info__date{
    margin: 0 0.5rem;
    color: #f3f3f3;
  }
`;

const BBSContent = styled.pre`
  background: #f4f4f4;
  padding: 10px;
`;

const { Content } = Layout;

const grid = {
  xs: 24,
};

const DetailPageScreen = ({
  match: {
    params: {
      pageId,
    },
  },
  isLoading,
  detail,
  handleFetchDetail,
}) => {
  const handleGoBack = useCallback(() => {
    history.push(routeConfig.beauty);
  }, []);
  useEffect(() => {
    handleFetchDetail(`/bbs/beauty/${pageId}`);
  }, [handleFetchDetail, pageId]);

  if (!detail) {
    return <div>unavailable</div>;
  }
  const imageList = detail.get('imageList');
  const content = detail.get('content');
  const author = detail.get('author');
  const title = detail.get('title');
  const date = detail.get('date');

  return (
    <Layout>
      <Helmet title={title} />
      <Header />
      <Content>
        {isLoading && <LoadingContainer />}
        <MetaInfo>
          <div>
            <Button onClick={handleGoBack}>
              <Icon type="left" />上一頁
            </Button>
            <span className={'meta-info__title'}>{title}</span>
          </div>
          by
          <span className={'meta-info__name'}>{author}</span>on
          <span className={'meta-info__date'}>{date}</span>
        </MetaInfo>
        <Row
          type={'flex'}
          justify={'center'}
        >
          {imageList && imageList.map((item) => (
            <Col key={item} {...grid}>
              <Image
                width="100%"
                src={item}
                alt={item}
                title={item}
              />
            </Col>
          ))}
        </Row>
        <BBSContent>
          {content}
        </BBSContent>
      </Content>
    </Layout>
  );
};

DetailPageScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      pageId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  handleFetchDetail: PropTypes.func,
  isLoading: PropTypes.bool,
  detail: PropTypes.instanceOf(Map),
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsLoadingDetail(),
  detail: makeSelectDetail(),
});
const mapDispatchToProps = (dispatch) => ({
  handleFetchDetail: (pageId) => dispatch(fetchDetail(pageId)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(DetailPageScreen);
