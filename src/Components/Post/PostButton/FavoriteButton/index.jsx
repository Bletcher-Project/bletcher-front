import React from 'react';
import PropTypes from 'prop-types';

import NoStyleButton from 'Components/Form/NoStyleButton';
import favoriteButton from 'Assets/images/favoriteButton.png';
import cx from 'classnames';

const defaultProps = {
  liked: false,
  onClick: null,
};
const propTypes = {
  liked: PropTypes.bool,
  onClick: PropTypes.func,
};

function FavoriteButton(props) {
  const { liked, onClick } = props;

  return (
    <NoStyleButton onClick={onClick}>
      <img
        className={cx('postButton favorite', liked ? 'unfill' : 'fill')}
        src={favoriteButton}
        alt="favorite"
      />
    </NoStyleButton>
  );
}

FavoriteButton.defaultProps = defaultProps;
FavoriteButton.propTypes = propTypes;

export default FavoriteButton;
