import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { addFavoritePost, deleteFavoritePost } from 'Redux/post';

import NoStyleButton from 'Components/Form/NoStyleButton';
import favorite from 'Assets/images/favorite.png';
import filledFavorite from 'Assets/images/favorite-filled.png';

const defaultProps = {
  liked: false,
};
const propTypes = {
  postId: PropTypes.number.isRequired,
  liked: PropTypes.bool,
};

function FavoriteButton(props) {
  const { postId, liked } = props;
  const [likedState, setlikedState] = useState(liked);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const isLogin = useSelector((state) => state.authReducer.isLogin);

  const handleFavorite = () => {
    if (!isLogin) {
      // alert('로그인하시길.');
    } else {
      if (likedState) {
        dispatch(deleteFavoritePost(postId, token));
      } else {
        dispatch(addFavoritePost(postId, token));
      }
      setlikedState(!likedState);
    }
  };

  return (
    <NoStyleButton onClick={() => handleFavorite()}>
      <img
        className="postButton favorite"
        src={likedState ? filledFavorite : favorite}
        alt="favorite"
      />
    </NoStyleButton>
  );
}

FavoriteButton.defaultProps = defaultProps;
FavoriteButton.propTypes = propTypes;

export default FavoriteButton;
