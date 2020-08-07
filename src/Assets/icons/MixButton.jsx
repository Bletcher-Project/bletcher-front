import React from 'react';

import PropTypes from 'prop-types';

import mixImage from 'Assets/images/mixButton.png';
import NoStyleButton from 'Components/Form/Button/NoStyleButton';

const defaultProps = {
  onClick: null,
};

const propTypes = {
  onClick: PropTypes.func,
};

const MixButton = (props) => {
  const { onClick } = props;
  return (
    <NoStyleButton
      onClick={onClick}
      content={<img src={mixImage} alt="mixButton" className="mix-button" />}
    />
  );
};

MixButton.defaultProps = defaultProps;
MixButton.propTypes = propTypes;

export default MixButton;
