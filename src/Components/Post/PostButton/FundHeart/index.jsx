import React from 'react';

import PropTypes from 'prop-types';

import bgFilledHeartImg from 'Assets/images/fundHeart-bg-fill.png';
import bgFilledPurpleImg from 'Assets/images/fundHeart-bg-purple.png';
import HeartImg from 'Assets/images/fundHeart-bg-removed.png';
import NoStyleButton from 'Components/Form/NoStyleButton';

const defaultProps = {
  onClick: null,
  fill: false,
  isClicked: false,
};

const propTypes = {
  isClicked: PropTypes.bool,
  onClick: PropTypes.func,
  fill: PropTypes.bool,
};

function onClickHandler() {
  console.log('fundHeart Clicked!');
}

const FundHeart = (props) => {
  const { onClick, fill, isClicked } = props;
  return fill ? (
    <NoStyleButton
      onClick={onClickHandler}
      content={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <img
          src={isClicked ? bgFilledPurpleImg : bgFilledHeartImg}
          alt="heartIcon"
          className="post__hover__fundHeart"
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
