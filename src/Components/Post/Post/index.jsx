import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PostHeader from 'Components/Post/PostHeader';
import PostFooter from 'Components/Post/PostFooter';

import { basicType } from 'PropTypes/post';

const defaultProps = {
  hoverIcon: null,
  headerPosition: 'bottom',
  footerOption: '',
  headerBackground: false,
};
const propTypes = {
  post: basicType.isRequired,
  hoverIcon: PropTypes.element,
  headerPosition: PropTypes.string,
  headerBackground: PropTypes.bool,
  footerOption: PropTypes.string,
};
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getSrc = (post) => {
    if (post.Image !== undefined) return post.Image.path;
    return post['Image.path'];
  };

  render() {
    const {
      post,
      hoverIcon,
      headerPosition,
      footerOption,
      headerBackground,
    } = this.props;
    return (
      <div className="post">
        <div className="post__hover">{hoverIcon}</div>
        <PostHeader
          title={post.title}
          background={headerBackground}
          position={headerPosition}
        />

        <div className="post__body">
          <div className="post__body__image">
            <img src={this.getSrc(post)} alt="artwork" />
          </div>
        </div>
        <PostFooter
          footerOption={footerOption}
          createdAt={footerOption ? post.created_at : ''}
        />
      </div>
    );
  }
}

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

export default Post;
