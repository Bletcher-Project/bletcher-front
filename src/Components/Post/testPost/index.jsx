import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';
import * as PostAction from 'Redux/post';

import { IMAGE, IMAGE_POST } from 'Constants/api-uri';

import LikeStar from 'Assets/icons/LikeStar';
import MixButton from 'Assets/icons/MixButton';

const defaultProps = {};
const propTypes = {
  postId: PropTypes.number.isRequired,
  postImg: PropTypes.string.isRequired,
  postCategory: PropTypes.string.isRequired,
  postTitle: PropTypes.string.isRequired,
  postDescription: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
  // isActive: PropTypes.string.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
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
    const { isFavorite } = this.props;
    this.state = {
      isHover: false,
      isFavorite,
    };
  }

  onClickHandler = () => {
    const { history, postId, userId } = this.props;
    history.push({
      pathname: '/detail',
      search: `?postId=${postId}&authorId=${userId}`,
    });
  };

  hoverToggler = (action) => {
    this.setState({ isHover: action === 'enter' });
  };

  onMouseHandler = (action) => {
    this.hoverToggler(action);
  };

  buttonClickHandler = (clickItem) => {
    if (clickItem === 'favorite') {
      // update user's favorite in database
    } else if (clickItem === 'mix') {
      // route to MixPage
    }
  };

  render() {
    const { postImg, postDescription, postCategory, postTitle } = this.props;
    const { isHover, isFavorite } = this.state;
    return (
      <div
        className="post"
        onMouseEnter={() => {
          this.onMouseHandler('enter');
        }}
        onMouseLeave={this.onMouseHandler}
      >
        {isHover && (
          <div className="post__hover">
            <div className="post__hover__icon">
              <LikeStar
                liked={isFavorite}
                onClick={() => {
                  this.buttonClickHandler('favorite');
                }}
              />
              <MixButton
                onClick={() => {
                  this.buttonClickHandler('mix');
                }}
              />
            </div>
          </div>
        )}
        <button
          className="postButton"
          type="button"
          onClick={this.onClickHandler}
        >
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
            <div className="post__footer__title">{postTitle}</div>
            <div className="post__footer__description">{postDescription}</div>
            <div className="post__footer__category">{postCategory}</div>
          </div>
        </button>
      </div>
    );
  }
}

TestPost.defaultProps = defaultProps;
TestPost.propTypes = propTypes;

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TestPost),
);
