import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';
import * as PostAction from 'Redux/post';

import cx from 'classnames';

import FundHeart from 'Assets/icons/FundHeart';
import DueDate from 'Assets/icons/DueDate';

import HoverIcon from 'Components/Post/HoverIcon';
import { dummyDueDate } from 'Dummies/dummyPost';
import TARGET from 'Constants/active-target';

const defaultProps = {
  createdAt: '',
  isFavorite: false,
};
const propTypes = {
  postId: PropTypes.number.isRequired,
  postImg: PropTypes.string.isRequired,
  postTitle: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool,
  userId: PropTypes.number.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  isActive: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
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
      isFundHeart: false, // need to chain with DB
    };
  }

  calcDueDate = (createDate) => {
    const dueDate = Date.parse(dummyDueDate) - Date.parse(createDate);
    return new Date(dueDate).toTimeString().substring(0, 8);
  };

  onClickHandler = (isActive) => {
    const { history, postId, userId } = this.props;
    if (isActive === 'new' || isActive === 'main' || isActive === 'funding') {
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

  validateAciveTarget = (isActive, toActive) => {
    if (Object.prototype.hasOwnProperty.call(TARGET, toActive)) {
      return TARGET[toActive].includes(isActive);
    }
    return false;
  };

  switchHoverIcon = (isActive) => {
    const { isFavorite, isFundHeart } = this.state;
    switch (isActive) {
      case 'funding':
        return HoverIcon('funding', isFundHeart);
      case 'user__Made by me':
      case 'user__Used by me':
        return HoverIcon('user__we');
      case 'user__me':
        return HoverIcon('user__me');
      default:
        return HoverIcon('default', isFavorite);
    }
  };

  render() {
    const { postImg, postTitle, isActive, createdAt } = this.props;
    const { isHover } = this.state;
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
              shown: this.validateAciveTarget(isActive, 'shown'),
              bottom: this.validateAciveTarget(isActive, 'bottom'),
              none: this.validateAciveTarget(isActive, 'none'),
            })}
          >
            <div
              className={cx('post__main__header__title', {
                blended: isActive === 'funding',
                userPage: this.validateAciveTarget(isActive, 'userPage'),
              })}
            >
              {isActive === 'shop' ||
              isActive === 'fundingEnd' ||
              isActive === 'funding'
                ? 'HyoJI X hangsoo'
                : postTitle}
            </div>
          </div>
          <div className="post__main__content">
            <div className="post__main__content__imgBox">
              <img
                className="post__main__content__imgBox__image"
                src={postImg}
                alt="postImage"
              />
              {isHover && this.validateAciveTarget(isActive, 'hover') && (
                <div
                  className={`post__main__content__imgBox__hover ${isActive}`}
                >
                  <div className="post__main__content__imgBox__hover__icon">
                    {this.switchHoverIcon(isActive)}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={`post__main__footer ${isActive}`}>
            {isActive === 'funding' && (
              <>
                <div className={`post__main__footer ${isActive}`}>
                  <div className={`post__main__footer ${isActive}__tab`}>
                    <div
                      className={`post__main__footer ${isActive}__tab__left`}
                    >
                      <span className="mr-1">
                        <DueDate />
                      </span>
                      <span>{this.calcDueDate(createdAt)}</span>
                    </div>
                    <div
                      className={`post__main__footer ${isActive}__tab__right`}
                    >
                      <span>
                        <FundHeart />
                      </span>
                      <span>354</span>
                    </div>
                  </div>
                  <div className={`post__main__footer ${isActive}__progress`}>
                    <hr
                      className={`post__main__footer ${isActive}__progress__bar`}
                    />
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
