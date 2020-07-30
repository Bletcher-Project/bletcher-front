import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import userCreatorImage from 'Assets/images/Creator.png';
import userSketcherImage from 'Assets/images/Sketcher.png';

const defaultProps = {};
const propTypes = {};

class Thumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultImage: this.props.type ? userCreatorImage : userSketcherImage,
      imageURL: props.src,
    };
  }

  render() {
    const { size } = this.props;
    const { defaultImage, imageURL } = this.state;
    return (
      <div className="thumbnail" onClick={this.handleUserPage}>
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

  handleError = () => {
    this.setState({ imageURL: this.state.defaultImage });
  };

  handleUserPage = () => {
    this.props.history.push({ pathname: '/' + this.props.userName });
  };
}

Thumbnail.defaultProps = defaultProps;
Thumbnail.propTypes = propTypes;

export default withRouter(Thumbnail);
