import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
  onClick: null,
  children: null,
};
const propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

function NoStyleButton(props) {
  const { onClick, children } = props;

  return (
    <div
      className="noStyleButton"
      role="button"
      onClick={onClick}
      onKeyPress={onClick}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

NoStyleButton.propTypes = propTypes;
NoStyleButton.defaultProps = defaultProps;

export default NoStyleButton;
