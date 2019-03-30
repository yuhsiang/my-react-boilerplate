import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Map } from 'immutable';

import { Card } from 'antd';

const { Meta } = Card;

const StyledCard = styled(Card)`
  margin: 0.5rem;
  cursor: pointer;

  .card__count--normal {
    color: green;
    font-size: 1.1rem;
  }
  .card__count--explode {
    color: #bc007d;
    font-size: 1.1rem;
  }
`;


const BBSCard = ({
  dataSource,
  handleSelectDetailPage,
}) => {
  const title = dataSource.get('title');
  const author = dataSource.get('author');
  const date = dataSource.get('date');
  const count = dataSource.get('count');

  const countClass = count === '爆' ? 'card__count--explode ' : 'card__count--normal';

  const handleClickDetail = useCallback(() => {
    const link = dataSource.get('link');
    const properLinkStructure = link.split('/');
    if (properLinkStructure.length > 0) {
      handleSelectDetailPage(properLinkStructure[properLinkStructure.length - 1]);
    }
  }, [dataSource, handleSelectDetailPage]);

  return (
    <StyledCard
      onClick={handleClickDetail}
    >
      <Meta
        title={title}
        description={`${author}-${date}`}
      />
      <div
        className={countClass}
      >
        {count}
      </div>
    </StyledCard>
  );
};

BBSCard.propTypes = {
  dataSource: PropTypes.instanceOf(Map),
  handleSelectDetailPage: PropTypes.func,
};

export default BBSCard;
