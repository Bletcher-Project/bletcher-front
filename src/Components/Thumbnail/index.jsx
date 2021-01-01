import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';

const defaultProps = {
  src: null,
  userName: '',
  size: 100,
};
const propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  src: PropTypes.string,
  userName: PropTypes.string,
  size: PropTypes.number,
};

function Thumbnail(props) {
  const { src, userName, size } = props;
  const [error, setError] = useState(!src);

  const handleUserPage = () => {
    const { history } = props;
    history.push({ pathname: `/user/${userName}` });
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <div
      className="thumbnail"
      role="button"
      onKeyPress={handleUserPage}
      onClick={handleUserPage}
      tabIndex={0}
    >
      {!error ? (
        <img
          className="thumbnail__image"
          src={src}
          width={size}
          height={size}
          onError={handleError}
          alt="profile"
        />
      ) : (
        <div
          className="thumbnail__image default"
          style={{ width: size, height: size, fontSize: size / 2 }}
        >
          <span>{userName && userName.substr(0, 1)}</span>
        </div>
      )}
    </div>
  );
}

Thumbnail.defaultProps = defaultProps;
Thumbnail.propTypes = propTypes;

export default withRouter(Thumbnail);
