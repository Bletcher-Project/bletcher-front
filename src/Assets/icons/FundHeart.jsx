import React from 'react';

import PropTypes from 'prop-types';

import bgFilledHeartImg from 'Assets/images/fundHeart-bg-fill.png';
import HeartImg from 'Assets/images/fundHeart-bg-removed.png';
import NoStyleButton from 'Components/Form/Button/NoStyleButton';

const defaultProps = {
  onClick: null,
  fill: false,
};

const propTypes = {
  onClick: PropTypes.func,
  fill: PropTypes.bool,
};

const FundHeart = (props) => {
  const { onClick, fill } = props;
  return fill ? (
    <NoStyleButton
      onClick={onClick}
      content={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <img
          src={bgFilledHeartImg}
          alt="heartIcon"
          className="heartIcon-hover"
        />
      }
    />
  ) : (
    <img src={HeartImg} alt="heartBadge" className="fundHeart" />
  );
};

FundHeart.defaultProps = defaultProps;
FundHeart.propTypes = propTypes;

export default FundHeart;
