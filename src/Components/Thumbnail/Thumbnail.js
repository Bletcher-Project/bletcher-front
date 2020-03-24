import React, { Component } from "react";

import userCreatorImage from "../../Assets/icon/Creator.png";
import userSketcherImage from "../../Assets/icon/Sketcher.png";

const defaultProps = {};
const propTypes = {};

class Thumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultImage: this.props.type ? userCreatorImage : userSketcherImage,
      imageURL: props.src
    };
  }

  render() {
    const { size } = this.props;
    const { defaultImage, imageURL } = this.state;
    return (
      <div className="thumbnail">
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
              src={`http://localhost:4000/image/${imageURL}`}
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
}

Thumbnail.defaultProps = defaultProps;
Thumbnail.propTypes = propTypes;

export default Thumbnail;
