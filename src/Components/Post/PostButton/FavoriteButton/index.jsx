/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';

import PropTypes from 'prop-types';

import favoriteButton from 'Assets/images/favoriteButton.png';
import NoStyleButton from 'Components/Form/NoStyleButton';

const defaultProps = {
  liked: false,
  onClick: null,
};

const propTypes = {
  liked: PropTypes.bool,
  onClick: PropTypes.func,
};

const FavoriteButton = (props) => {
  const { liked, onClick } = props;
  return liked ? (
    <NoStyleButton
      onClick={onClick}
      content={
        <img
          src={favoriteButton}
          alt="favorite_unfill"
          className="favorite-unfill"
        />
      }
    />
  ) : (
    <NoStyleButton
      onClick={onClick}
      content={
        <img
          src={favoriteButton}
          alt="favorite_fill"
          className="favorite-fill"
        />
      }
    />
  );
};

FavoriteButton.defaultProps = defaultProps;
FavoriteButton.propTypes = propTypes;

export default FavoriteButton;
