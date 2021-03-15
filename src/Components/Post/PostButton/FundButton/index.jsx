import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { addFundingPost } from 'Redux/post';

import NoStyleButton from 'Components/Form/NoStyleButton';

import bgFilledHeartImg from 'Assets/images/fundHeart-bg-fill.png';
import bgFilledPurpleImg from 'Assets/images/fundHeart-bg-purple.png';

const defaultProps = {
  isFunding: false,
  postId: null,
};
const propTypes = {
  isFunding: PropTypes.bool,
  postId: PropTypes.number,
};

function FundButton(props) {
  const { isFunding, postId } = props;

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  const token = useSelector((state) => state.authReducer.token);

  const [isClicked, setIsClicked] = useState(isFunding);
  const fundClickHandler = async (e) => {
    e.stopPropagation();
    if (isLogin) {
      if (!isClicked) dispatch(addFundingPost(postId, token));
      setIsClicked(true);
    }
  };
  return (
    <NoStyleButton onClick={(e) => fundClickHandler(e)}>
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
