import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';
import * as PostAction from 'Redux/post';

import cx from 'classnames';

import { IMAGE, IMAGE_POST } from 'Constants/api-uri';

import LikeStar from 'Assets/icons/LikeStar';
import MixButton from 'Assets/icons/MixButton';
import DueDate from 'Assets/icons/DueDate';
import person from 'Assets/icons/person';

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

  onClickHandler = (isActive) => {
    const { history, postId, userId } = this.props;
    if (isActive === 'new' || isActive === 'feed' || isActive === 'funding') {
      history.push({
        pathname: '/detail',
        search: `?postId=${postId}&authorId=${userId}&active=${isActive}`,
      });
    }
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
    const { postImg, postTitle, isActive } = this.props;
    const { isHover, isFavorite } = this.state;
    return (
      <div
        className={cx('post', {
          centered: isActive === 'funding' || isActive === 'shop',
        })}
      >
        <button
          className="post__main"
          type="button"
          onClick={() => {
            this.onClickHandler(isActive);
          }}
          onMouseOver={() => {
            this.hoverToggler('enter');
          }}
          onMouseLeave={this.hoverToggler}
          onFocus={() => {}}
        >
          <div
            className={cx('post__main__header', {
              shown: isActive === 'funding' || isActive === 'shop',
              none: isActive === 'user',
            })}
          >
            <div className="post__main__header__title">
              {isActive === 'shop' ? '권혁진 X 권혁순' : postTitle}
            </div>
          </div>
          {isHover && (isActive === 'new' || isActive === 'feed') && (
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

          <div
            className={cx('post__main__footer', {
              funding: isActive === 'funding',
              shop: isActive === 'shop',
            })}
          >
            {isActive === 'funding' && (
              <>
                <div className={`post__main__footer ${isActive}`}>
                  <hr className={`post__main__footer ${isActive}__line`} />
                  <div className={`post__main__footer ${isActive}__tab`}>
                    <div
                      className={`post__main__footer ${isActive}__tab__left`}
                    >
                      <span className="mr-1">
                        <DueDate />
                      </span>
                      <span>1:32:21</span>
                    </div>
                    <div
                      className={`post__main__footer ${isActive}__tab__right`}
                    >
                      <span>{person}</span>
                      <span>192/300</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </button>
      </div>
    );
  }
}

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
