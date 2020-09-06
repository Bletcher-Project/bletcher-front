import React from 'react';
import PropTypes from 'prop-types';

import NoStyleButton from 'Components/Form/NoStyleButton';
import mixImage from 'Assets/images/mixButton.png';

const defaultProps = {
  onClick: null,
};
const propTypes = {
  onClick: PropTypes.func,
};

function MixButton(props) {
  const { onClick } = props;
  return (
    <NoStyleButton onClick={onClick}>
      <img className="postButton mix" src={mixImage} alt="mix" />
    </NoStyleButton>
  );
}

MixButton.defaultProps = defaultProps;
MixButton.propTypes = propTypes;

export default MixButton;
