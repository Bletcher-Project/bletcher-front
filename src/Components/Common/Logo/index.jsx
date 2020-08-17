import React from 'react';
import PropTypes from 'prop-types';

import logoText from 'Assets/logo/logo-text.png';
import logoPoint from 'Assets/logo/logo-point.png';

const defaultProps = {
  width: 90,
  point: true,
};
const propTypes = {
  width: PropTypes.number,
  point: PropTypes.bool,
};

function Logo(props) {
  const { width, point } = props;

  return (
    <div className="logo">
      <img className="logo__text" src={logoText} width={width} alt="logo" />
      {point ? (
        <img
          className="logo__point"
          src={logoPoint}
          width={width / 1.7}
          alt="logo"
        />
      ) : null}
    </div>
  );
}

Logo.defaultProps = defaultProps;
Logo.propTypes = propTypes;

export default Logo;
