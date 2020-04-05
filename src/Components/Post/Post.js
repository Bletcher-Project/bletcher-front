import React, { Component } from "react";

import { connect } from "react-redux";
import { ServerEndPoint } from "../../Configs/Server";
import * as PostAction from "../../Redux/Actions/PostAction";

import { Thumbnail } from "../../Components";

import moment from "moment";
import commaNumber from "comma-number";

import likeIcon from "../../Assets/icons/heart.png";
import filledLikeIcon from "../../Assets/icons/heart-filled.png";
import commentIcon from "../../Assets/icons/comment.png";
import scrapIcon from "../../Assets/icons/scrap.png";
import filledScrapIcon from "../../Assets/icons/scrap-filled.png";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deletePost: id => dispatch(PostAction.deletePost(id)),
    likePost: (postId, token) => dispatch(PostAction.postLike(postId, token))
  };
};

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeClicked: false,
      likeIcon: likeIcon,
      scrapClicked: false,
      scrapIcon: scrapIcon
    };
  }

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
      isLiked,
      postLike,
      postComments
    } = this.props;
    const {
      likeIcon,
      scrapIcon
    } = this.state;

    return (
      <div className="post">
        <div className="post__header">
          <Thumbnail
            className="post__header__userProfile"
            size="50"
            src={userProfileImg !== null ? `${ServerEndPoint}image/profile/${userProfileImg}` : null}
            type={userType}
            userName={userName}
          />
          <div className="post__header__postInfo">
            <div>
              <span className="post__header__postInfo__userName">{userName}</span>
              <span className="post__header__postInfo__userType">
                [{userType === "0" ? "Sketcher" : "Creator"}]
              </span>
            </div>

            <div className="post__header__postInfo__postDate">
              {moment(postDate).format("YYYY-MM-DD HH:mm:ss")}
            </div>
          </div>
        </div>

        <div className="post__body">
          <img
            className="post__body__postImage"
            src={`${ServerEndPoint}image/post/${postImg}`}
            alt="postImage"
          />
        </div>

        <div className="post__footer">
          <div className="post__footer__postContent">{postContent}</div>
          <div className="post__footer__postHashtag">
            {postHashTags.map(hashtags => (
              <div className="post__footer__postHashtag-tagbox" key={hashtags.id}>
                <span>#{hashtags.tags}</span>
              </div>
            ))}
          </div>

          <div className="post__footer__communicateArea">
            <div className="post__footer__communicateArea__like" onClick={this.toggleLike}>
              <img
                src={isLiked ? filledLikeIcon : likeIcon}
                width="25px"
                height="25px"
                alt="likeIcon"
              />
              {isMyPost ? (
                <span className="post__footer__communicateArea__like-num">{commaNumber(postLike)}</span>
              ) : null}
            </div>

            <div className="post__footer__communicateArea__comment" onClick={this.toggleComment}>
              <img
                src={commentIcon}
                width="25px"
                height="25px"
                alt="commentIcon"
              />
              <span className="post__footer__communicateArea__comment-num">{commaNumber(postComments.length)}</span>
            </div>

            <div className="post__footer__communicateArea__scrap" onClick={this.toggleScrap}>
              <img
                src={scrapIcon}
                width="25px"
                height="25px"
                alt="scrapIcon"
              />
            </div>
          </div>
          {/* 
          {postComments
            .slice(
              0,
              moreCommentClicked & (postComments.length > 2)
                ? postComments.length
                : !moreCommentClicked & (postComments.length > 2)
                  ? 2
                  : postComments.length
            )
            .map(comment => (
              <span key={comment.id} style={{ fontSize: "0.9rem" }}>
                <strong className="mr-2">{comment.author}</strong>
                <span>{comment.comment}</span>
                <br></br>
              </span>
            ))}
          <span
            className="small"
            style={{ cursor: "pointer" }}
            onClick={this.toggleMoreComment}
          >
            {postComments.length > 2
              ? moreCommentClicked
                ? `close comment...`
                : `more comment...`
              : null}
          </span> */}
        </div>
      </div>
    );
  }

  toggleLike = () => {
    const { likePost, postId, token } = this.props;
    this.setState({ likeClicked: !this.state.likeClicked }, () => {
      if (this.state.likeClicked) {
        this.setState({ likeIcon: filledLikeIcon });
        likePost(postId, token);
      } else {
        this.setState({ likeIcon: likeIcon });
      }
    });
  };

  toggleComment = () => {
    this.setState({ writeComment: !this.state.writeComment });
  };

  toggleScrap = () => {
    this.setState({ scrapClicked: !this.state.scrapClicked }, () => {
      if (this.state.scrapClicked) {
        this.setState({ scrapIcon: filledScrapIcon });
      } else {
        this.setState({ scrapIcon: scrapIcon });
      }
    });
  };

  handleDelete = async () => {
    const postDelete = await this.props.deletePost(this.props.postId);
    return postDelete ? window.location.reload() : alert("delete failed!");
  };

}

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Post);
