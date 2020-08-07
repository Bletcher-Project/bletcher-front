import React from 'react';

import PropTypes from 'prop-types';

import shareImg from 'Assets/images/share.png';
import NoStyleButton from 'Components/Form/Button/NoStyleButton';

const defaultProps = {
  onClick: null,
};

const propTypes = {
  onClick: PropTypes.func,
};

const ShareButton = (props) => {
  const { onClick } = props;
  return (
    <NoStyleButton
      onClick={onClick}
      content={
        <img src={shareImg} alt="shareButton" className="share-button" />
      }
    />
  );
};

ShareButton.defaultProps = defaultProps;
ShareButton.propTypes = propTypes;

export default ShareButton;
