import React, { Component } from 'react';
import PropTypes from 'prop-types';

const defaultProps = {};
const propTypes = {
  postImg: PropTypes.string.isRequired,
};

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { postImg } = this.props;
    return (
      <div className="post">
        <img className="post__image" src={postImg} alt="artwork" />
        <div className="post__hover" />
      </div>
    );
  }
}

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

export default Post;
