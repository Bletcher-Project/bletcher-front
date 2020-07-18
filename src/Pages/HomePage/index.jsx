import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as PostAction from 'Redux/Actions/PostAction';

import NavBar from 'Components/Main/NavBar';
import Post from 'Components/Post/Post';
import UploadPost from 'Components/Upload/UploadPost';

const defaultProps = {};

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user,
  };
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: null,
      feedLoading: true,
      newPostClicked: false,
    };
  }

  componentDidMount() {
    this.getAllPosts();
  }

  getAllPosts = () => {
    const { dispatch, token } = this.props;
    dispatch(PostAction.getAllPosts(token)).then((result) => {
      console.log(token);
      this.setState({ feed: result, feedLoading: false });
    });
  };

  toggleNewPost = () => {
    this.setState({ newPostClicked: !this.state.newPostClicked });
  };

  render() {
    const { newPostClicked, feedLoading, feed } = this.state;
    const { user } = this.props;
    return (
      <div className="homePage">
        <NavBar isActive="feed" />

        {newPostClicked ? (
          <UploadPost
            userId={this.props.user.id}
            userProfileImg={this.props.user.profileImgName}
            userType={this.props.user.type}
            handlePrevStep={this.toggleNewPost}
          />
        ) : (
          <div>
            <div className="homePage__newPost" onClick={this.toggleNewPost}>
              What are you thinking now?
            </div>
            <div className="homePage__postList">
              {!feedLoading && user && feed
                ? feed.map((data) => {
                    return (
                      <div className="homePage__post mb-3" key={data.id}>
                        <Post
                          postId={data.id}
                          isMyPost={user.id === data.UserId}
                          userProfileImg={data.User.profileImgName}
                          userName={data.User.name}
                          userType={data.User.type}
                          postContent={data.content}
                          postHashTags={[
                            { id: 1, tags: 'flower' },
                            { id: 2, tags: 'sunny' },
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
}

HomePage.defaultProps = defaultProps;
HomePage.propTypes = propTypes;

export default connect(mapStateToProps)(HomePage);
