import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';
import * as PostAction from 'Redux/post';

import cx from 'classnames';

import FavoriteButton from 'Assets/icons/FavoriteButton';
import MixButton from 'Assets/icons/MixButton';
import ShareButton from 'Assets/icons/ShareButton';
import DueDate from 'Assets/icons/DueDate';
import FundHeart from 'Assets/icons/FundHeart';

import { dummyDueDate } from 'Dummies/dummyPost';

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

  buttonClickHandler = async (clickItem) => {
    if (clickItem === 'favorite') {
      // update user's favorite in database
    } else if (clickItem === 'mix') {
      // route to MixPage
    } else if (clickItem === 'fundHeart') {
      const { isFundHeart } = this.state;
      await new Promise((accept) =>
        this.setState({ isFundHeart: !isFundHeart }, accept),
      );
      // update post's fundCnt in database
    } else if (clickItem === 'share') {
      // share funding post
    }
  };

  render() {
    const { postImg, postTitle, isActive, createdAt } = this.props;
    const { isHover, isFavorite, isFundHeart } = this.state;
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
              shown:
                isActive === 'funding' ||
                isActive === 'shop' ||
                isActive === 'fundingEnd',
              none: isActive === 'user',
            })}
          >
            <div className="post__main__header__title">
              {isActive === 'shop' || isActive === 'fundingEnd'
                ? '권혁진 X 권혁순'
                : postTitle}
            </div>
          </div>
          {isHover &&
            (isActive === 'new' ||
              isActive === 'feed' ||
              isActive === 'funding') && (
              <div className="post__main__hover">
                <div className="post__main__hover__icon">
                  {isActive === 'funding' ? (
                    <>
                      <FundHeart
                        isClicked={isFundHeart}
                        fill
                        onClick={(e) => {
                          e.stopPropagation();
                          this.buttonClickHandler('fundHeart');
                        }}
                      />
                      <ShareButton
                        onClick={(e) => {
                          e.stopPropagation();
                          this.buttonClickHandler('share');
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <FavoriteButton
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
                    </>
                  )}
                </div>
              </div>
            )}

          <div className="post__main__content">
            <div className="post__main__content__imgBox">
              <img
                className="post__main__content__imgBox__image"
                src={postImg}
                alt="postImage"
              />
            </div>
          </div>

          <div
            className={cx('post__main__footer', {
              funding: isActive === 'funding',
              shop: isActive === 'shop',
              fundingEnd: isActive === 'fundingEnd',
            })}
          >
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
                      <span>192/300</span>
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
