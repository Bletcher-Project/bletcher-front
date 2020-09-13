import React from 'react';
import PropTypes from 'prop-types';

import NoStyleButton from 'Components/Form/NoStyleButton';
import bgFilledHeartImg from 'Assets/images/fundHeart-bg-fill.png';
import bgFilledPurpleImg from 'Assets/images/fundHeart-bg-purple.png';

const defaultProps = {
  isClicked: false,
};
const propTypes = {
  isClicked: PropTypes.bool,
};

function onClickHandler() {
  // console.log('fundHeart Clicked!');
}

function FundButton(props) {
  const { isClicked } = props;

  return (
    <NoStyleButton onClick={onClickHandler}>
      <img
        className="postButton fund"
        src={isClicked ? bgFilledPurpleImg : bgFilledHeartImg}
        alt="fund"
      />
    </NoStyleButton>
  );
}

FundButton.defaultProps = defaultProps;
FundButton.propTypes = propTypes;

export default FundButton;
