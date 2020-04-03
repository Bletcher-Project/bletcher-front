import React, { Component } from "react";

import { connect } from "react-redux";
import { ServerEndPoint } from "../../Configs/Server";
// import * as AuthAction from "../../Redux/Actions/AuthAction";
import * as PostAction from "../../Redux/Actions/PostAction";

import { NavBar, Thumbnail } from "../../Components";

import Gallery from "react-photo-gallery";

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
      myPostImgs: [{
        src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
        width: 4,
        height: 3,
        key: "0"
      }]
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
    const { myPostImgs } = this.state;
    console.log(user);
    console.log(myPostImgs);
    return (
      <div className="userPage">
        <NavBar isActive="user" />
        {user ? (
          <div className="userPage__contents">
            <div className="userPage__contents__header">
              <div className="userPage__contents__header__thumb">
                <Thumbnail size="100" src={null} type={user.type} />
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
              <Gallery
                photos={myPostImgs}
                direction="column"
                columns={3}
                margin={5}
                onClick={this.handleClickPost}
              />
            </div>
          </div>
        ) : null}


      </div>
    );
  }

  getUserPost = async () => {
    const { dispatch, user } = this.props;
    const { myPostImgs } = this.state;
    const postImg = [];
    await dispatch(PostAction.getPostByUserId(user.id)).then(posts => {
      posts.forEach(post => {
        postImg.push({ src: `${ServerEndPoint}image/post/${post.postImgName}`, width: 3, height: 4, key: String(post.id) });
      });
    });
    this.setState({ myPostImgs: myPostImgs.concat(postImg) });
  }

  handleClickPost = (e, { photo, index }) => {
    const { dispatch } = this.props;
    console.log(photo, index);
    dispatch(PostAction.getPostByPostId(photo.key)).then(post => {
      console.log(post);
    });
  }
}

UserPage.defaultProps = defaultProps;
UserPage.propTypes = propTypes;

export default connect(mapStateToProps)(UserPage);
