import React, { Component } from "react";

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
import timediff from "timediff";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Avatar from "@material-ui/core/Avatar";

import defaultProfile from "../../Assets/images/default_profile.svg";
import likeIcon from "../../Assets/images/like.png";
import filledLikeIcon from "../../Assets/images/like-filled.png";
import commentIcon from "../../Assets/images/comment.png";
import clockIcon from "../../Assets/images/clock.png";

const defaultProps = {};
const propTypes = {};

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      likeClicked: false,
      likeIcon: likeIcon
    };
  }

  render() {
    const { dropdownOpen, likeIcon } = this.state;
    const {
      posterName,
      posterProfile,
      posterType,
      postContent,
      postHashTags,
      postImg,
      postDate,
      postComments
    } = this.props;
    return (
      <Card className="post mb-3">
        <CardHeader className="post__header">
          <Avatar
            style={{ width: "60px", height: "60px" }}
            src={posterProfile ? posterProfile : defaultProfile}
          ></Avatar>
          <CardText className="mb-0 ml-2">
            <span className="post__header-name">{posterName}</span>
            <br></br>
            <span className="post__header-type">
              {posterType === 0 ? "Sketcher" : "Creator"}
            </span>
            <span className="post__header-type ml-2">
              <img className="mr-1" src={clockIcon} width="13px"></img>
              {this.handlePostTime(postDate)}
            </span>
          </CardText>

          <ButtonDropdown
            className="ml-auto"
            isOpen={dropdownOpen}
            toggle={this.toggle}
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
        </CardHeader>
        <CardBody className="post__body pt-0 pb-1 pr-0">
          <CardImg src={postImg}></CardImg>
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
        <CardFooter className="post__footer">
          <CardText>
            <img
              className="mr-1"
              src={likeIcon}
              onClick={this.handleLike}
              width="26px"
            ></img>
            <img className="ml-2" src={commentIcon} width="25px"></img>
          </CardText>
          <CardText>
            {postComments.map(comment => (
              <span>
                <strong className="mr-2">{comment.author}</strong>
                <span>{comment.comment}</span>
                <br></br>
              </span>
            ))}
          </CardText>
        </CardFooter>
      </Card>
    );
  }

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  handleLike = () => {
    this.setState({ likeClicked: !this.state.likeClicked }, () => {
      if (this.state.likeClicked) {
        this.setState({ likeIcon: filledLikeIcon });
      } else {
        this.setState({ likeIcon: likeIcon });
      }
    });
  };

  handlePostTime = time => {
    const timePass = timediff(time, new Date());
    const postDate = new Date(time);
    return timePass.weeks >= 1
      ? "" +
          postDate.getFullYear() +
          "-" +
          (postDate.getMonth() + 1) +
          "-" +
          postDate.getDate()
      : (1 <= timePass.days) & (timePass.days < 7)
      ? timePass.days + " days ago"
      : timePass.days < 1
      ? timePass.hours + " hours ago"
      : timePass.minutes + " min ago";
  };
}

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

export default Post;
