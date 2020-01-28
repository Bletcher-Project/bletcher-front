import React, { Component } from "react";

const defaultProps = {};
const propTypes = {};

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="post">Post</div>;
  }
}

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

export default Post;
