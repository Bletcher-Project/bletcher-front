import React, { Component } from "react";

import { connect } from "react-redux";
import * as PostAction from "../../Redux/Actions/PostAction";

import { CommentInput, Thumbnail } from "../../Components";

import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardText,
  CardImg,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import commaNumber from "comma-number";

import likeIcon from "../../Assets/images/like.svg";
import filledLikeIcon from "../../Assets/images/like-filled.svg";
import commentIcon from "../../Assets/images/comment.svg";

const defaultProps = {};
const propTypes = {};

const mapDispatchToProps = dispatch => {
  return {
    deletePost: id => dispatch(PostAction.deletePost(id))
  };
};

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      likeClicked: false,
      moreCommentClicked: false,
      writeComment: false,
      likeIcon: likeIcon
    };
  }

  render() {
    const {
      dropdownOpen,
      likeIcon,
      moreCommentClicked,
      writeComment
    } = this.state;
    const {
      isMyPost,
      userName,
      userProfile,
      userType,
      postContent,
      postHashTags,
      postImg,
      postDate,
      postLike,
      postComments
    } = this.props;

    return (
      <Card className="post mb-3">
        <CardHeader className="post__header">
          <Thumbnail size="60" src={userProfile} type={userType} />
          <CardText className="mb-0 ml-2">
            <strong className="post__header-name">{userName}</strong>
            <br></br>
            <span className="post__header-type">
              {userType === 0 ? "Sketcher" : "Creator"}
            </span>
            <span className="post__header-type ml-2">
              {postDate.slice(0, 10)}
            </span>
          </CardText>
          {isMyPost ? (
            <Dropdown
              className="ml-auto"
              isOpen={dropdownOpen}
              toggle={this.toggleDropMenu}
            >
              <DropdownToggle
                color="none"
                focus="none"
                style={({ backgroundColor: "white" }, { boxShadow: "none" })}
              >
                <MoreHorizIcon style={{ color: "grey", fontSize: "2.1rem" }} />
              </DropdownToggle>
              <DropdownMenu style={{ minWidth: "50px", left: "-28px" }}>
                <DropdownItem>Modify</DropdownItem>
                <DropdownItem onClick={this.toggleDelete}>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : null}
        </CardHeader>
        <CardBody className="post__body pt-0 pb-1 pr-0">
          <CardImg
            alt="post image"
            src={postImg}
            style={{ borderRadius: "0", fontSize: "0.8rem" }}
          ></CardImg>
          <CardText className="ml-3 mt-3">{postContent}</CardText>
          <CardText className="ml-3 mt-3">
            {postHashTags.map(hashtags => (
              <span
                key={hashtags.id}
                style={{
                  cursor: "pointer",
                  color: "#8e24aa",
                  fontSize: "0.8rem",
                  fontWeight: "600"
                }}
              >
                #{hashtags.tags}{" "}
              </span>
            ))}
          </CardText>
        </CardBody>
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.05)",
            width: "95%",
            height: "2px",
            alignSelf: "center",
            marginBottom: "0",
            marginTop: "7px"
          }}
        ></div>
        <CardFooter
          className="post__footer"
          style={{ backgroundColor: "#fff" }}
        >
          <CardText className="mb-2">
            <img
              alt="like"
              className="post__footer-like mr-0"
              src={likeIcon}
              onClick={this.toggleLike}
              width="32px"
            />
            {isMyPost ? (
              <span className="ml-1 mr-2" style={{ fontSize: "0.7rem" }}>
                {commaNumber(postLike)}
              </span>
            ) : null}
            <img
              alt="comment"
              className="post__footer-comment ml-0"
              src={commentIcon}
              onClick={this.toggleComment}
              width="26px"
            />
          </CardText>
          <CardText>
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
            </span>
          </CardText>
          <Collapse in={writeComment}>
            <div className="post__footer-postComment">
              <CommentInput
                placeholder="write comment..."
                type="text"
                name="comment"
              />
              <Button size="small" style={{ height: "36px", outline: "none" }}>
                post
              </Button>
            </div>
          </Collapse>
        </CardFooter>
      </Card>
    );
  }

  toggleMoreComment = () => {
    this.setState({ moreCommentClicked: !this.state.moreCommentClicked });
  };

  toggleDropMenu = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  toggleLike = () => {
    this.setState({ likeClicked: !this.state.likeClicked }, () => {
      if (this.state.likeClicked) {
        this.setState({ likeIcon: filledLikeIcon });
      } else {
        this.setState({ likeIcon: likeIcon });
      }
    });
  };

  toggleComment = () => {
    this.setState({ writeComment: !this.state.writeComment });
  };

  toggleDelete = () => {
    this.deletePost(JSON.stringify(this.props.postId));
  };

  deletePost = async id => {
    const postDelete = await this.props.deletePost(id);
    return postDelete ? window.location.reload() : alert("delete failed!");
  };
}

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(Post);
