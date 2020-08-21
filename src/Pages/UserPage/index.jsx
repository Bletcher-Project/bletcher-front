import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';
import * as PostAction from 'Redux/post';
import * as AuthAction from 'Redux/auth';

import NavBar from 'Components/Common/NavBar';
import Thumbnail from 'Components/Thumbnail';
import Post from 'Components/Post/Post';

import { Modal } from 'reactstrap';

import dummyPost from 'Dummies/dummyPost';

import settingIcon from 'Assets/images/setting.png';
import {
  INIT,
  IMAGE,
  USER_API,
  QUERY_NAME,
  IMAGE_PROFILE,
  IMAGE_POST,
} from 'Constants/api-uri';

const defaultProps = {
  user: null,
};
const propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
  }),
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user,
  };
};

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMyPage: false,
      userInfo: null,
      userPostImgs: [],
      selectedPost: null,
      openModal: false,
    };
  }

  setUser = async () => {
    const { match, user } = this.props;
    if (match.params.username === user.nickname) {
      this.setState({ userInfo: user, isMyPage: true, userPostImgs: [] });
    } else {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}${INIT}${USER_API}${QUERY_NAME}${match.params.username}`,
          {
            method: 'GET',
          },
        );
        if (response.status === 200) {
          const result = await response.json();
          this.setState({
            userInfo: result.userInfo,
            isMyPage: false,
            userPostImgs: [],
          });
          return result;
        }
        return null;
      } catch (error) {
        console.error(error);
      }
    }
  };

  getUserPost = async () => {
    const { dispatch, token } = this.props;
    const { userInfo, userPostImgs } = this.state;
    const postImg = [];
    await dispatch(PostAction.getPostByUserId(userInfo.id, token)).then(
      (posts) => {
        posts.forEach((post) => {
          postImg.push({
            src: `${process.env.REACT_APP_SERVER_URL}${IMAGE}${IMAGE_POST}/${post.postImgName}`,
            width: parseInt(post.postImgWidth),
            height: parseInt(post.postImgHeight),
            key: String(post.id),
          });
        });
      },
    );
    this.setState({ userPostImgs: userPostImgs.concat(postImg) });
  };

  handleClickPost = (e, { photo, index }) => {
    const { dispatch, token } = this.props;
    dispatch(PostAction.getPostByPostId(photo.key, token)).then((post) => {
      this.setState({ selectedPost: post, openModal: true });
    });
  };

  editUserProfile = () => {
    const { history, match } = this.props;
    history.push({ pathname: `${match.url}/profile` });
  };

  signOutHandler = async () => {
    const { dispatch, history } = this.props;
    await dispatch(AuthAction.signOut());
    await history.push('/');
  };

  componentDidMount = async () => {
    if (this.props.user) {
      await this.setUser();
      await this.getUserPost();
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { token, user, match } = this.props;
    if (
      (token && user !== prevProps.user) ||
      prevProps.match.params.username !== match.params.username
    ) {
      await this.setUser();
      await this.getUserPost();
    }
  };

  render() {
    const {
      isMyPage,
      userInfo,
      userPostImgs,
      selectedPost,
      openModal,
    } = this.state;
    return (
      <div className="userPage">
        <NavBar isActive={isMyPage ? 'user' : ''} />
        {userInfo ? (
          <div className="userPage__contents">
            <div className="userPage__contents__header">
              <div className="userPage__contents__header__thumb">
                <Thumbnail
                  size="100"
                  src={
                    userInfo.profileImgName !== null
                      ? `${process.env.REACT_APP_SERVER_URL}${IMAGE}${IMAGE_PROFILE}/${userInfo.profileImgName}`
                      : null
                  }
                  type={userInfo.type}
                  userName={userInfo.name}
                />
              </div>
              <div className="userPage__contents__header__profile">
                <div className="userPage__contents__header__profile-name-set">
                  <div className="nameArea">
                    <h1>{userInfo.name}</h1>
                    <div id="nameUnderBar" />
                  </div>
                  {isMyPage ? (
                    <div className="settingArea">
                      <button type="button" onClick={this.signOutHandler}>
                        signout
                      </button>
                      <button
                        className="settingButton"
                        type="button"
                        onClick={this.editUserProfile}
                      >
                        <img src={settingIcon} alt="setting" />
                      </button>
                    </div>
                  ) : null}
                </div>
                <div className="userPage__contents__header__profile-status">
                  <p>{userInfo.status}</p>
                </div>
                {isMyPage ? (
                  <div className="userPage__contents__header__profile-follow">
                    <div className="followBox">
                      <span className="followTitle">Followers</span>
                      <span id="followerNum">0</span>
                    </div>
                    <div className="followBox">
                      <span className="followTitle">Following</span>
                      <span id="followingNum">0</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="userPage__contents__body">
              {userPostImgs.length > 0
                ? dummyPost.posts.map((data) => {
                    return (
                      <Post
                        postId={data.id}
                        postImg={data.postImgName}
                        postCategory={data.postCategory}
                        postTitle={data.postTitle}
                        postDescription={data.postDescription}
                        isFavorite={data.isFavorite}
                        userId={data.UserId}
                        key={data.id}
                        isActive="user"
                      />
                    );
                  })
                : null}
            </div>
          </div>
        ) : null}

        <div className="userPage__modal">
          {selectedPost ? (
            <Modal
              isOpen={openModal}
              toggle={() => this.setState({ openModal: !openModal })}
              centered
            >
              <Post
                postId={selectedPost.id}
                isMyPost={isMyPage}
                userProfileImg={selectedPost.User.profileImgName}
                userName={selectedPost.User.name}
                userType={selectedPost.User.type}
                postContent={selectedPost.content}
                postHashTags={[
                  { id: 1, tags: 'flower' },
                  { id: 2, tags: 'sunny' },
                ]} /// ///
                postImg={selectedPost.postImgName}
                postDate={selectedPost.createdAt}
                isLiked={selectedPost.isLiked}
                postLike={selectedPost.likeCount}
              />
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

UserPage.defaultProps = defaultProps;
UserPage.propTypes = propTypes;

export default connect(mapStateToProps)(UserPage);
