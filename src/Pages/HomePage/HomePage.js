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
                    className="homePage__post"
                    isMyPost={this.props.user.id === data.UserId}
                    userName={data.User.name}
                    userProfile={data.User.profileImgName}
                    userType={1}
                    postContent={data.content}
                    postHashTags={["flower", "sunny"]}
                    postImg={data.postImgName}
                    postDate={data.createdAt}
                    postLike={135440}
                    postComments={[
                      { author: "Endrew", comment: "good job" },
                      { author: "Sdi_dk", comment: "awesome" }
                    ]}
                  />
                );
              })
              : null
          }
        </div>
      </div>
    );
  }

  getAllPosts = () => {
    this.props.dispatch(PostAction.getAllPosts()).then(result => {
      this.setState({ feed: result, feedLoading: false });
    });
  }
}

HomePage.defaultProps = defaultProps;
HomePage.propTypes = propTypes;

export default connect(mapStateToProps)(HomePage);
