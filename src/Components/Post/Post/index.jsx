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
  postTitle: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  isActive: PropTypes.string.isRequired,
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

class Post extends Component {
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
    const { postImg, postTitle } = this.props;
    const { isHover, isFavorite } = this.state;
    return (
      <div className="post">
        <button
          className="post__main"
          type="button"
          onClick={this.onClickHandler}
          onMouseOver={() => {
            this.hoverToggler('enter');
          }}
          onMouseLeave={this.hoverToggler}
          onFocus={() => {}}
        >
          <div className="post__main__header">
            <div className="post__main__header__title">{postTitle}</div>
          </div>
          {isHover && (
            <div className="post__main__hover">
              <div className="post__main__hover__icon">
                <LikeStar
                  liked={isFavorite}
                  onClick={(e) => {
                    e.stopPropagation();
                    this.buttonClickHandler('favorite');
                  }}
                />
                <MixButton
                  onClick={(e) => {
                    e.stopPropagation();
                    this.buttonClickHandler('mix');
                  }}
                />
              </div>
            </div>
          )}

          <div className="post__main__content">
            <div className="post__main__content__imgBox">
              <img
                className="post__main__content__imgBox__image"
                src={`${process.env.REACT_APP_SERVER_URL}${IMAGE}${IMAGE_POST}/${postImg}`}
                alt="postImage"
              />
            </div>
          </div>
        </button>
      </div>
    );
  }
}

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
