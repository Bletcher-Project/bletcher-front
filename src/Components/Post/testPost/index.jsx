import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as PostAction from 'Redux/post';

import { IMAGE, IMAGE_POST } from 'Constants/api-uri';

const defaultProps = {};
const propTypes = {
  postImg: PropTypes.string.isRequired,
  // postCategory: PropTypes.string.isRequired,
  // postTitle: PropTypes.string.isRequired,
  // postDesrciption: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (id) => dispatch(PostAction.deletePost(id)),
    likePost: (postId, token) => dispatch(PostAction.postLike(postId, token)),
    deleteLikePost: (postId, token) =>
      dispatch(PostAction.deleteLike(postId, token)),
  };
};

class TestPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { postImg } = this.props;
    return (
      <div className="post">
        <div className="post__content">
          <div className="post__content__imageBox">
            <img
              className="post__content__imageBox__image"
              src={`${process.env.REACT_APP_SERVER_URL}${IMAGE}${IMAGE_POST}/${postImg}`}
              alt="postImage"
            />
          </div>
        </div>
        <div className="post__footer">
          {/* <div className="post__footer__title">{postTitle}</div> */}
          <div className="post__footer__title">Title</div>
          {/* <div className="post__footer__description">{postDesrciption}</div> */}
          <div className="post__footer__description">Description</div>
          {/* <div className="post__footer__category">{postCategory}</div> */}
          <div className="post__footer__category">
            <span>A</span>
            <span>B</span>
            <span>C</span>
          </div>
        </div>
      </div>
    );
  }
}

TestPost.defaultProps = defaultProps;
TestPost.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(TestPost);
