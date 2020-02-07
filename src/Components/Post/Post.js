import React, { Component } from "react";

import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardText,
  CardImg,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import MoreVertIcon from "@material-ui/icons/MoreVert";

const defaultProps = {};
const propTypes = {};

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      posts: [
        {
          profileImg:
            "https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/06/cat-217679.jpg?h=c4ed616d&itok=3qHaqQ56",
          profileName: "Jay",
          postImg:
            "https://static.boredpanda.com/blog/wp-content/uploads/2020/01/Japanese-illustrator-makes-hyper-realistic-cat-illustrations-that-will-probably-take-your-breath-away-5e1c1763ef0a5__880.jpg",
          postDesc: "DESCRIPTION - user describe about post",
          postComments: [{ author: "Jay", comment: "test comment." }]
        }
      ]
    };
  }

  render() {
    const { posts, dropdownOpen } = this.state;
    return (
      <Card className="post">
        <CardHeader className="post__header">
          <img
            className="post__header-profile"
            src={posts[0].profileImg}
            width="50px"
            height="50px"
            style={{ borderRadius: "50%" }}
          ></img>
          <span className="post__header-name ml-2">{posts[0].profileName}</span>
          <ButtonDropdown
            className="post__header-option ml-auto"
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
            <DropdownMenu style={{ minWidth: "50px" }}>
              <DropdownItem>Modify</DropdownItem>
              <DropdownItem>Delete</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </CardHeader>
        <CardBody style={{ paddingLeft: 0, paddingRight: 0 }}>
          <CardImg src={posts[0].postImg} className="post__img"></CardImg>
          <CardText className="post__desc">{posts[0].postDesc}</CardText>
        </CardBody>
        <CardFooter>
          <CardText className="post__share">
            <span className="post__share-like">LIKE</span>
            <span className="post__share-comment">COMMENT</span>
          </CardText>
          <CardText className="post__comments">
            <span className="post__comments-comment">
              {posts[0].postComments[0].author} /{" "}
              {posts[0].postComments[0].comment}
            </span>
          </CardText>
        </CardFooter>
      </Card>
    );
  }

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };
}

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

export default Post;
