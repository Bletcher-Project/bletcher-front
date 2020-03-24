import React, { Component } from "react";

import { connect } from "react-redux";
import * as PostAction from "../../Redux/Actions/PostAction";

import { NavBar, Post } from "../../Components";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: null,
      feedLoading: true
    };
  }

  componentDidMount() {
    this.getAllPosts();
  }

  render() {
    return (
      <div className="homePage">
        <NavBar isActive="feed" />
        <div className="homePage__postList">
          {
            !this.state.feedLoading && this.props.user && this.state.feed
              ? this.state.feed.map((data) => {
                return (
                  <Post
                    key={data.id}
                    postId={data.id}
                    className="homePage__post"
                    isMyPost={this.props.user.id === data.UserId}
                    userProfileImg={data.User.profileImgName}
                    userName={data.User.name}
                    userType={data.User.type}
                    postContent={data.content}
                    postHashTags={[
                      { id: 1, tags: "flower" },
                      { id: 2, tags: "sunny" }
                    ]}//////
                    postImg={data.postImgName}
                    postDate={data.createdAt}
                    postLike={135440}//////
                    postComments={[
                      { id: 1, author: "Endrew", comment: "good job" },
                      { id: 2, author: "Sdi_dk", comment: "awesome" }
                    ]}//////
                  />
                );
              })
              : null}
        </div>
      </div>
    );
  }

  getAllPosts = () => {
    this.props.dispatch(PostAction.getAllPosts()).then(result => {
      this.setState({ feed: result, feedLoading: false });
    });
  };
}

HomePage.defaultProps = defaultProps;
HomePage.propTypes = propTypes;

export default connect(mapStateToProps)(HomePage);
