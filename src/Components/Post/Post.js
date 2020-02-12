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

import MoreVertIcon from "@material-ui/icons/MoreVert";

import likeIcon from "../../Assets/images/like.png";
import filledLikeIcon from "../../Assets/images/like-filled.png";
import commentIcon from "../../Assets/images/comment.png";

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
          postImg:
            "https://colorlib.com/wp/wp-content/uploads/sites/2/featured-horizontal-poster-mockup.jpg",
          postDesc: "DESCRIPTION - user describe about post",
          postDate: "2020-02-10",
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
          <img src={posts[0].profileImg}></img>
          <span className="ml-2">{posts[0].profileName}</span>
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
        <CardBody className="post__body pt-0 pb-1">
          <CardImg src={posts[0].postImg}></CardImg>
          <CardText className="ml-3 mt-3">{posts[0].postDate}</CardText>
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
}

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

export default Post;
