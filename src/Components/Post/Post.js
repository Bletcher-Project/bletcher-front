import React, { Component } from "react";
import { MainInput } from "../../Components";
import Button from "@material-ui/core/Button";

import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardText,
  CardImg,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Avatar from "@material-ui/core/Avatar";

import defaultProfile from "../../Assets/images/default_profile.svg";
import likeIcon from "../../Assets/images/like.svg";
import filledLikeIcon from "../../Assets/images/like-filled.svg";
import commentIcon from "../../Assets/images/comment.svg";
import clockIcon from "../../Assets/images/clock.png";

const defaultProps = {};
const propTypes = {};

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
        <CardHeader
          className="post__header"
          style={{ backgroundColor: "#fff" }}
        >
          <Avatar
            style={{ width: "60px", height: "60px" }}
            src={userProfile ? userProfile : defaultProfile}
          ></Avatar>
          <CardText className="mb-0 ml-2">
            <span className="post__header-name">{userName}</span>
            <br></br>
            <span className="post__header-type">
              {userType === 0 ? "Sketcher" : "Creator"}
            </span>
            <span className="post__header-type ml-2">
              <img alt="time" className="mr-1" src={clockIcon} width="13px" />
              {postDate.slice(0, 10)}
            </span>
          </CardText>
          {isMyPost ? (
            <ButtonDropdown
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
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          ) : null}
        </CardHeader>
        <CardBody className="post__body pt-0 pb-1 pr-0">
          <CardImg
            alt="post image"
            src={postImg}
            style={{ borderRadius: "0" }}
          ></CardImg>
          <CardText className="ml-3 mt-3">{postContent}</CardText>
          <CardText className="ml-3 mt-3">
            {postHashTags.map(hashtags => (
              <span
                style={{
                  cursor: "pointer",
                  color: "#8e24aa",
                  fontSize: "0.9rem",
                  fontWeight: "600"
                }}
              >
                #{hashtags}{" "}
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
              <span className="mr-1" style={{ fontSize: "0.8rem" }}>
                {postLike} Likes
              </span>
            ) : null}
            <img
              alt="comment"
              className="post__footer-comment ml-0"
              src={commentIcon}
              onClick={this.toggleComment}
              width="32px"
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
                <span>
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
          {writeComment ? (
            <div className="post__footer-postComment">
              <MainInput
                label="Write Comment"
                type="text"
                name="comment"
                width="380px"
              />
              <Button
                variant="contained"
                size="small"
                style={{ height: "36px", marginTop: "10px" }}
              >
                post
              </Button>
            </div>
          ) : null}
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
}

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

export default Post;
