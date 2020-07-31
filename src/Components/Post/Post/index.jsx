import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as PostAction from 'Redux/post';

import Thumbnail from 'Components/Thumbnail';
import Comment from 'Components/Post/Comment';

import moment from 'moment';
import commaNumber from 'comma-number';

import likeIcon from 'Assets/images/heart.png';
import filledLikeIcon from 'Assets/images/heart-filled.png';
import commentIcon from 'Assets/images/comment.png';
import filledCommentIcon from 'Assets/images/comment-filled.png';
import scrapIcon from 'Assets/images/scrap.png';
import filledScrapIcon from 'Assets/images/scrap-filled.png';

import {
  INIT,
  COMMENT_API,
  IMAGE,
  IMAGE_PROFILE,
  IMAGE_POST,
} from 'Constants/api-uri';

const defaultProps = {};
const propTypes = {};

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
    this.state = {
      likeClicked: this.props.isLiked,
      likeIcon: likeIcon,
      likeActionCount: 0,
      scrapClicked: false,
      scrapIcon: scrapIcon,
      commentClicked: false,
      commentIcon: commentIcon,
      comments: [],
    };
  }

  toggleLike = () => {
    const { likePost, deleteLikePost, postId, token } = this.props;
    this.setState({ likeClicked: !this.state.likeClicked }, () => {
      if (this.state.likeClicked) {
        this.setState({ likeActionCount: this.state.likeActionCount + 1 });
        likePost(postId, token);
      } else {
        this.setState({ likeActionCount: this.state.likeActionCount - 1 });
        deleteLikePost(postId, token);
      }
    });
  };

  toggleComment = () => {
    this.setState({ commentClicked: !this.state.commentClicked }, () => {
      if (this.state.commentClicked) {
        this.setState({ commentIcon: filledCommentIcon });
        this.getComments();
      } else {
        this.setState({ commentIcon });
      }
    });
  };

  toggleScrap = () => {
    this.setState({ scrapClicked: !this.state.scrapClicked }, () => {
      if (this.state.scrapClicked) {
        this.setState({ scrapIcon: filledScrapIcon });
      } else {
        this.setState({ scrapIcon });
      }
    });
  };

  handleDelete = async () => {
    const postDelete = await this.props.deletePost(this.props.postId);
    return postDelete ? window.location.reload() : alert('delete failed!');
  };

  getComments = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${COMMENT_API}/${this.props.postId}`,
        {
          method: 'GET',
          headers: {
            'x-access-token': this.props.token,
          },
        },
      );
      if (response.status === 200) {
        const result = await response.json();
        this.setState({ comments: result.comments });
      }
    } catch (error) {
      console.log(error);
      this.setState({ comments: [] });
    }
  };

  render() {
    const {
      isMyPost,
      userProfileImg,
      userName,
      userType,
      postContent,
      postHashTags,
      postImg,
      postDate,
      postLike,
    } = this.props;
    const {
      likeClicked,
      likeIcon,
      likeActionCount,
      scrapIcon,
      commentClicked,
      commentIcon,
      comments,
    } = this.state;

    return (
      <div className="post">
        <div className="post__postSection">
          <div className="post__postSection__header">
            <Thumbnail
              className="post__postSection__header__userProfile"
              size="50"
              src={
                userProfileImg !== null
                  ? `${process.env.REACT_APP_SERVER_URL}${IMAGE}${IMAGE_PROFILE}/${userProfileImg}`
                  : null
              }
              type={userType}
              userName={userName}
            />
            <div className="post__postSection__header__postInfo">
              <div>
                <span className="post__postSection__header__postInfo__userName">
                  {userName}
                </span>
                <span className="post__postSection__header__postInfo__userType">
                  [{userType === '0' ? 'Sketcher' : 'Creator'}]
                </span>
              </div>

              <div className="post__postSection__header__postInfo__postDate">
                {moment(postDate).format('YYYY-MM-DD HH:mm:ss')}
              </div>
            </div>
          </div>

          <div className="post__postSection__body">
            <img
              className="post__postSection__body__postImage"
              src={`${process.env.REACT_APP_SERVER_URL}${IMAGE}${IMAGE_POST}/${postImg}`}
              alt="postImage"
            />
          </div>

          <div className="post__postSection__footer">
            <div className="post__postSection__footer__postContent">
              {postContent}
            </div>
            <div className="post__postSection__footer__postHashtag">
              {postHashTags.map((hashtags) => (
                <div
                  className="post__postSection__footer__postHashtag-tagbox"
                  key={hashtags.id}
                >
                  <span>#{hashtags.tags}</span>
                </div>
              ))}
            </div>

            <div className="post__postSection__footer__communicateArea">
              <div
                className="post__postSection__footer__communicateArea__like"
                onClick={this.toggleLike}
              >
                <img
                  src={likeClicked ? filledLikeIcon : likeIcon}
                  width="25px"
                  height="25px"
                  alt="likeIcon"
                />
                {isMyPost && postLike + likeActionCount > 0 ? (
                  <span className="post__postSection__footer__communicateArea__like-num">
                    {commaNumber(postLike + likeActionCount)}
                  </span>
                ) : null}
              </div>

              <div
                className="post__postSection__footer__communicateArea__comment"
                onClick={this.toggleComment}
              >
                <img
                  src={commentIcon}
                  width="25px"
                  height="25px"
                  alt="commentIcon"
                />
                {/* <span className="post__postSection__footer__communicateArea__comment-num">
                  {commaNumber(comments.length)}
                </span> */}
              </div>

              <div
                className="post__postSection__footer__communicateArea__scrap"
                onClick={this.toggleScrap}
              >
                <img
                  src={scrapIcon}
                  width="25px"
                  height="25px"
                  alt="scrapIcon"
                />
              </div>
            </div>
          </div>
        </div>

        {commentClicked ? (
          <div className="post__commentSection">
            <Comment comments={comments} />
          </div>
        ) : null}
      </div>
    );
  }
}

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Post);
