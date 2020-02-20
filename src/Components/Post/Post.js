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
import MoreVertIcon from "@material-ui/icons/MoreVert";

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
      likeIcon: likeIcon,
      posts: [
        {
          profileImg:
            "https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/06/cat-217679.jpg?h=c4ed616d&itok=3qHaqQ56",
          profileName: "Jay",
          profileType: 0,
          postImg:
            "https://colorlib.com/wp/wp-content/uploads/sites/2/featured-horizontal-poster-mockup.jpg",
          postDesc: "DESCRIPTION - user describe about post",
          postDate: "2020-02-19 17:00:00",
          postComments: [{ author: "Jay", comment: "test comment." }]
        }
      ]
    };
  }

  render() {
    const { posts, dropdownOpen, likeIcon } = this.state;
    return (
      <Card className="post">
        <CardHeader className="post__header">
          <img
            src={posts[0].profileImg}
            width="60px"
            height="60px"
            style={{ borderRadius: "50%" }}
          ></img>
          <CardText className="mb-0 ml-2">
            <span className="post__header-name">{posts[0].profileName}</span>
            <br></br>
            <span className="post__header-type">
              {posts[0].profileType === 0 ? "Sketcher" : "Creator"}
            </span>
            <span className="post__header-type ml-2">
              <img className="mr-1" src={clockIcon} width="13px"></img>
              {this.handlePostTime(posts[0].postDate)}
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
              <MoreVertIcon style={{ color: "grey" }} />
            </DropdownToggle>
            <DropdownMenu style={{ minWidth: "50px", left: "-28px" }}>
              <DropdownItem>Modify</DropdownItem>
              <DropdownItem>Delete</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </CardHeader>
        <CardBody className="post__body pt-0 pb-1 pr-0">
          <CardImg src={posts[0].postImg}></CardImg>
          <CardText className="ml-3 mt-3">{posts[0].postDesc}</CardText>
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
            <strong className="mr-2">{posts[0].postComments[0].author}</strong>
            {posts[0].postComments[0].comment}
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
    console.log(timePass);
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
