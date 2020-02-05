import React, { Component } from "react";

const defaultProps = {};
const propTypes = {};

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { contentHeight: ["300px", "200px"] };
  }

  render() {
    const { contentHeight } = this.state;
    return (
      <div className="post">
        <div className="post__header">
          <div className="post__header-profile">PIC</div>
          <div className="post__header-name">Jay</div>
          <div className="post__header-option">OPT</div>
        </div>
        <div className="post__content" style={{ height: contentHeight[0] }}>
          IMAGE
        </div>
        <div className="post__desc">DESCRIPTION - user describe about post</div>
        <div className="post__share">
          <div className="post__share-like">LIKE</div>
          <div className="post__share-comment">COMMENT</div>
        </div>
        <div className="post__comments">
          <div className = "post__comments-comment">
            <span>Jay</span><span> / test comment. </span>
          </div>
        </div>
      </div>
    );
  }
}

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

export default Post;
