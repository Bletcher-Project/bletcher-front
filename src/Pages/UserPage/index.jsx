import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';
import * as PostAction from 'Redux/post';
import * as AuthAction from 'Redux/auth';

import NavBar from 'Components/Common/NavBar';
import Thumbnail from 'Components/Thumbnail';
import Post from 'Components/Post/Post';
import Upload from 'Components/Upload/UploadPost';

import EditButton from 'Assets/images/editButton.svg';
import { INIT, USER_API, QUERY_NAME } from 'Constants/api-uri';

const defaultProps = {
  user: null,
  token: null,
};
const propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
  }),
  token: PropTypes.string,
  history: ReactRouterPropTypes.history.isRequired,
  dispatch: PropTypes.func.isRequired,
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

  getUserPosts = async () => {
    const { dispatch, token } = this.props;
    const { userInfo } = this.state;
    dispatch(PostAction.getPostByUserId(userInfo.id, token)).then((result) => {
      this.setState({ userPostImgs: result });
    });
  };

  showUserPosts = () => {
    const { userPostImgs } = this.state;
    if (userPostImgs) {
      return userPostImgs.map((data) => {
        return (
          <Post
            postId={data.id}
            postImg={data.Image.path}
            postTitle={data.title}
            userId={data.User.id}
            key={data.id}
            isActive="user"
          />
        );
      });
    }
    return null;
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
    const { user } = this.props;
    if (user) {
      await this.setUser();
      await this.getUserPosts();
    }
  };

  componentDidUpdate = async (prevProps) => {
    const { token, user, match } = this.props;
    if (
      (token && user !== prevProps.user) ||
      prevProps.match.params.username !== match.params.username
    ) {
      await this.setUser();
      await this.getUserPosts();
    }
  };

  // <button type="button" onClick={this.signOutHandler}>
  //   signout
  // </button>

  render() {
    const { isMyPage } = this.state;
    return (
      <div className="userPage">
        <NavBar isActive={isMyPage ? 'user' : ''} />
        <div className="userPage__header">
          <div className="userPage__header__thumb">
            <Thumbnail size="100" src={null} />
            {isMyPage ? (
              <button
                type="button"
                onClick={this.editUserProfile}
                className="editButton"
              >
                <img src={EditButton} alt="editbutton" />
              </button>
            ) : null}
          </div>
          <div className="userPage__header__profile">
            <span className="userPage__header__profile__name">KWON</span>
          </div>
          <div className="userPage__header__rowTab">
            <ul className="userPage__header__rowTab__buttons">
              <div className="userPage__header__rowTab__buttons__upload">
                <Upload />
              </div>
              <li>
                <button type="button">me</button>
              </li>
              <li>
                <button type="button">Made by me</button>
              </li>
              <li>
                <button type="button">Used by me</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="userPage__postList">{this.showUserPosts()}</div>
      </div>
    );
  }
}

UserPage.defaultProps = defaultProps;
UserPage.propTypes = propTypes;

export default connect(mapStateToProps)(UserPage);
