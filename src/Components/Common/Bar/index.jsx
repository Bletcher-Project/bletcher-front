import React from 'react';

import PropTypes from 'prop-types';

const defaultProps = {
  height: 2,
  barSize: 0.5,
  value: 0,
  children: null,
  barRef: null,
  className: 'Bar',
};
const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number,
  barSize: PropTypes.number,
  value: PropTypes.number,
  children: PropTypes.element,
  className: PropTypes.string,
  barRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

function Bar(props) {
  const getStyle = (__width, __height) => {
    return {
      width: `${__width}%`,
      height: `${__height}rem`,
    };
  };

  const { width, height, barSize, value, children, barRef, className } = props;
  return (
    <div className={className} style={getStyle(width, height)}>
      <div
        className={`${className}__bar`}
        style={getStyle(value, barSize)}
        ref={barRef}
      />
      {children}
    </div>
  );
}

Bar.defaultProps = defaultProps;
Bar.propTypes = propTypes;

export default Bar;
