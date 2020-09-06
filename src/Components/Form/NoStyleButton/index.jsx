import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
  onClick: null,
  content: null,
};
const propTypes = {
  onClick: PropTypes.func,
  content: PropTypes.node,
};

function NoStyleButton(props) {
  const { onClick, content } = props;

  return (
    <div
      className="noStyleButton"
      role="button"
      onClick={onClick}
      onKeyPress={onClick}
      tabIndex={0}
    >
      {content}
    </div>
  );
}

NoStyleButton.propTypes = propTypes;
NoStyleButton.defaultProps = defaultProps;

export default NoStyleButton;
