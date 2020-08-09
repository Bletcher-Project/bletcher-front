import React from 'react';

import PropTypes from 'prop-types';

const defaultProps = {
  title: '',
  description: '',
};

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

function Jumbotron(props) {
  const { title, description } = props;
  return (
    <div className="Jumbotron">
      <div className="Jumbotron__content">
        <hr className="Jumbotron__content__line" />
        <div className="Jumbotron__content__title">{title}</div>
        <div className="Jumbotron__content__description">{description}</div>
      </div>
    </div>
  );
}

Jumbotron.defaultProps = defaultProps;
Jumbotron.propTypes = propTypes;

export default Jumbotron;
