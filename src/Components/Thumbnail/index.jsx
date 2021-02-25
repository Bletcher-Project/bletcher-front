import React from 'react';
import { withRouter } from 'react-router-dom';

import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';

import NoStyleButton from 'Components/Form/NoStyleButton';

const defaultProps = {
  src: null,
  userName: '',
  size: 100,
  hasLink: false,
};
const propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  src: PropTypes.string,
  userName: PropTypes.string,
  size: PropTypes.number,
  hasLink: PropTypes.bool,
};

function Thumbnail(props) {
  const { src, userName, size, hasLink } = props;

  const handleUserPage = () => {
    const { history } = props;
    history.push({ pathname: `/user/${userName}` });
  };

  return (
    <NoStyleButton
      className="thumbnail"
      onClick={hasLink ? handleUserPage : undefined}
    >
      {src ? (
        <div className="thumbnail__image" style={{ width: size, height: size }}>
          <img src={src} alt="profile" />
        </div>
      ) : (
        <div
          className="thumbnail__image default"
          style={{ width: size, height: size, fontSize: size / 2 }}
        >
          <span>{userName && userName.substr(0, 1)}</span>
        </div>
      )}
    </NoStyleButton>
  );
}

Thumbnail.defaultProps = defaultProps;
Thumbnail.propTypes = propTypes;

export default withRouter(Thumbnail);
