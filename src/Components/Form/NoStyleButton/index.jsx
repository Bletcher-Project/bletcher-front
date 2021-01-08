import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

const defaultProps = {
  className: '',
  onClick: null,
  children: null,
};
const propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

function NoStyleButton(props) {
  const { className, onClick, children } = props;

  return (
    <div
      className={cx('noStyleButton', className)}
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
