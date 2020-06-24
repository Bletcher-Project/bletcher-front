import React, { Component } from "react";

import { connect } from "react-redux";
import * as PostAction from "../../Redux/Actions/PostAction";

import { NavBar, Post, Upload } from "../../Components";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user
  };
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: null,
      feedLoading: true,
      newPostClicked: false
    };
  }

  componentDidMount() {
    this.getAllPosts();
  }

  render() {
    const { newPostClicked } = this.state;
    return (
      <div className="homePage">
        <NavBar isActive="feed" />

        {newPostClicked ? (
          <Upload
            userId={this.props.user.id}
            userProfileImg={this.props.user.profileImgName}
            userType={this.props.user.type}
            handlePrevStep={this.toggleNewPost}
          />
        ) : (
            <div>
              <div className="homePage__newPost" onClick={this.toggleNewPost}>What are you thinking now?</div>
              <div className="homePage__postList">
                {!this.state.feedLoading && this.props.user && this.state.feed
                  ? this.state.feed.map(data => {
                    return (
                      <div className="homePage__post mb-3" key={data.id}>
                        <Post
                          postId={data.id}
                          isMyPost={this.props.user.id === data.UserId}
                          userProfileImg={data.User.profileImgName}
                          userName={data.User.name}
                          userType={data.User.type}
                          postContent={data.content}
                          postHashTags={[
                            { id: 1, tags: "flower" },
                            { id: 2, tags: "sunny" }
                          ]} //////
                          postImg={data.postImgName}
                          postDate={data.createdAt}
                          isLiked={data.isLiked}
                          postLike={data.likeCount}
                        />
                      </div>
                    );
                  })
                  : null}
              </div>
            </div>
          )}
      </div>
    );
  }

  getAllPosts = () => {
    this.props.dispatch(PostAction.getAllPosts(this.props.token)).then(result => {
      this.setState({ feed: result, feedLoading: false });
    });
  };

  toggleNewPost = () => {
    this.setState({ newPostClicked: !this.state.newPostClicked });
  };
}

HomePage.defaultProps = defaultProps;
HomePage.propTypes = propTypes;

export default connect(mapStateToProps)(HomePage);
