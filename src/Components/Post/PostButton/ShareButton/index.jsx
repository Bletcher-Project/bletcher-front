import React from 'react';
import PropTypes from 'prop-types';

import NoStyleButton from 'Components/Form/NoStyleButton';
import shareImg from 'Assets/images/share.png';

const defaultProps = {
  onClick: null,
};
const propTypes = {
  onClick: PropTypes.func,
};

function ShareButton(props) {
  const { onClick } = props;
  return (
    <NoStyleButton onClick={onClick}>
      <img className="postButton share" src={shareImg} alt="share" />
    </NoStyleButton>
  );
}

ShareButton.defaultProps = defaultProps;
ShareButton.propTypes = propTypes;

export default ShareButton;
