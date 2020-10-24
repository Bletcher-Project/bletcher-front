import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
  children: null,
};
const propTypes = {
  children: PropTypes.element,
};

function Empty(props) {
  const { children } = props;
  return (
    <div className="empty">
      <h1 className="empty__header">Please wait</h1>
      {children}
      <p className="empty__description">
        Hope to see you
        <br />
        next Version
      </p>
    </div>
  );
}

Empty.defaultProps = defaultProps;
Empty.propTypes = propTypes;

export default Empty;
