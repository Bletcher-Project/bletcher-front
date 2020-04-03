import React, { Component } from "react";

import { connect } from "react-redux";
import { ServerEndPoint } from "../../Configs/Server";
// import * as AuthAction from "../../Redux/Actions/AuthAction";
import * as PostAction from "../../Redux/Actions/PostAction";

import { NavBar, Thumbnail, Post } from "../../Components";

import Gallery from "react-photo-gallery";
import { Modal } from "reactstrap";

import settingIcon from "../../Assets/icons/setting.png";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myPostImgs: [],
      selectedPost: null,
      openModal: false
    };
  }

  componentDidMount() {
    if (this.props.user) {
      this.getUserPost();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user && this.props.user !== prevProps.user) {
      this.getUserPost();
    }
  }

  render() {
    const { user } = this.props;
    const { myPostImgs, selectedPost, openModal } = this.state;
    // console.log(user);
    // console.log(myPostImgs);
    return (
      <div className="userPage">
        <NavBar isActive="user" />
        {user ? (
          <div className="userPage__contents">
            <div className="userPage__contents__header">
              <div className="userPage__contents__header__thumb">
                <Thumbnail
                  size="100"
                  src={user.profileImgName !== null ? `${ServerEndPoint}image/profile/${user.profileImgName}` : null}
                  type={user.type}
                />
              </div>
              <div className="userPage__contents__header__profile">
                <div className="userPage__contents__header__profile-name-set">
                  <div className="nameArea">
                    <h1>{user.name}</h1>
                    <div id="nameUnderBar"></div>
                  </div>
                  <div className="settingArea">
                    <img src={settingIcon} alt="setting" />
                  </div>
                </div>
                <div className="userPage__contents__header__profile-status">
                  <p>{user.status}</p>
                </div>
                <div className="userPage__contents__header__profile-follow">
                  <div className="followBox">
                    <span className="followTitle">Followers</span><span id="followerNum">0</span>
                  </div>
                  <div className="followBox">
                    <span className="followTitle">Following</span><span id="followingNum">0</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="userPage__contents__body">
              {myPostImgs.length > 0 ?
                <Gallery
                  photos={myPostImgs}
                  direction="column"
                  columns={3}
                  margin={5}
                  onClick={this.handleClickPost}
                />
                : null}
            </div>
          </div>
        ) : null}

        <div className="userPage__modal">
          {selectedPost ?
            <Modal isOpen={openModal} toggle={() => this.setState({ openModal: !openModal })} centered={true}>
              <Post
                isMyPost={true}
                userProfileImg={selectedPost.User.profileImgName}
                userName={selectedPost.User.name}
                userType={selectedPost.User.type}
                postContent={selectedPost.content}
                postHashTags={[
                  { id: 1, tags: "flower" },
                  { id: 2, tags: "sunny" }
                ]} //////
                postImg={selectedPost.postImgName}
                postDate={selectedPost.createdAt}
                postLike={135440} //////
                postComments={[
                  { id: 1, author: "Endrew", comment: "good job" },
                  { id: 2, author: "Sdi_dk", comment: "awesome" }
                ]} ////// 
              />
            </Modal>
            : null}
        </div>

      </div>
    );
  }

  getUserPost = async () => {
    const { dispatch, user } = this.props;
    const { myPostImgs } = this.state;
    const postImg = [];
    await dispatch(PostAction.getPostByUserId(user.id)).then(posts => {
      posts.forEach(post => {
        postImg.push({ src: `${ServerEndPoint}image/post/${post.postImgName}`, width: post.postImgWidth, height: post.postImgHeight, key: String(post.id) });
      });
    });
    this.setState({ myPostImgs: myPostImgs.concat(postImg) });
  }

  handleClickPost = (e, { photo, index }) => {
    const { dispatch } = this.props;
    dispatch(PostAction.getPostByPostId(photo.key)).then(post => {
      this.setState({ selectedPost: post, openModal: true });
    });
  }
}

UserPage.defaultProps = defaultProps;
UserPage.propTypes = propTypes;

export default connect(mapStateToProps)(UserPage);
