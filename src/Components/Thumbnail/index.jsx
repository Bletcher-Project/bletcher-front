import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';

import userCreatorImage from 'Assets/images/Creator.png';

const defaultProps = {
  src: null,
  size: 100,
  userName: '',
};
const propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  src: PropTypes.string,
  size: PropTypes.number,
  userName: PropTypes.string,
};

class Thumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultImage: userCreatorImage,
      imageURL: props.src,
    };
  }

  handleError = () => {
    const { defaultImage } = this.state;
    this.setState({ imageURL: defaultImage });
  };

  handleUserPage = () => {
    const { history, userName } = this.props;
    history.push({ pathname: `/user/${userName}` });
  };

  render() {
    const { size } = this.props;
    const { defaultImage, imageURL } = this.state;
    return (
      <div
        className="thumbnail"
        role="button"
        onKeyPress={this.handleUserPage}
        onClick={this.handleUserPage}
        tabIndex={0}
      >
        {imageURL === null || imageURL === undefined ? (
          <img
            className="thumbnail__image"
            src={defaultImage}
            width={size}
            height={size}
            alt="defaultProfile"
          />
        ) : (
          <img
            className="thumbnail__image"
            src={imageURL}
            onError={this.handleError}
            width={size}
            height={size}
            alt="userProfile"
          />
        )}
      </div>
    );
  }
}

Thumbnail.defaultProps = defaultProps;
Thumbnail.propTypes = propTypes;

export default withRouter(Thumbnail);
