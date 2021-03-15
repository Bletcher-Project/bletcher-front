import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
  children: null,
  description: ['Hope to see you', 'next Version'],
  title: 'Please wait',
};
const propTypes = {
  children: PropTypes.element,
  description: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
};

function Empty(props) {
  const { children, description, title } = props;
  return (
    <div className="empty">
      <h1 className="empty__header">{title}</h1>
      {children}
      <p className="empty__description">
        {description[0]}
        <br />
        {description[1]}
      </p>
    </div>
  );
}

Empty.defaultProps = defaultProps;
Empty.propTypes = propTypes;

export default Empty;
