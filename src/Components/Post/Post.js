import React, { Component } from "react";

import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardText,
  CardImg
} from "reactstrap";

const defaultProps = {};
const propTypes = {};

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          profileImg:
            "https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/06/cat-217679.jpg?h=c4ed616d&itok=3qHaqQ56",
          profileName: "Jay",
          postImg:
            "https://static.boredpanda.com/blog/wp-content/uploads/2020/01/Japanese-illustrator-makes-hyper-realistic-cat-illustrations-that-will-probably-take-your-breath-away-5e1c1763ef0a5__880.jpg",
          postContent: "DESCRIPTION - user describe about post",
          postComments: [{ author: "Jay", comment: "test comment." }]
        }
      ]
    };
  }

  render() {
    const { posts } = this.state;
    return (
      <Card className="post">
        <CardHeader className="post__header">
          <span className="post__header-profile">
            <img src={posts[0].profileImg}></img>
          </span>
          <span className="post__header-name">{posts[0].profileName}</span>
          <span className="post__header-option">OPT</span>
        </CardHeader>
        <CardBody style={{ paddingLeft: 0, paddingRight: 0 }}>
          <CardImg src={posts[0].postImg} className="post__content"></CardImg>
          <CardText className="post__desc">{posts[0].postContent}</CardText>
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
}

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

export default Post;
