import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import cx from 'classnames';

import { connect } from 'react-redux';
import * as PostAction from 'Redux/post';

import NavBar from 'Components/Common/NavBar';
import Thumbnail from 'Components/Thumbnail';
import Post from 'Components/Post/Post';
import Upload from 'Components/Upload/UploadPost';

import EditButton from 'Assets/images/editButton.png';
import FILTER from 'Constants/filter-option';

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
      postFilter: 'me',
    };
  }

  setUser = async () => {
    const { match, user } = this.props;
    if (match.params.username === user.nickname) {
      await new Promise((accept) =>
        this.setState(
          { userInfo: user, isMyPage: true, userPostImgs: [] },
          accept,
        ),
      );
    } else {
      // Other UserPage
      // TODO::Jinny- get other userinfo without fetch redux 'user'
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
    const { userPostImgs, postFilter } = this.state;
    if (userPostImgs) {
      return userPostImgs.map((data) => {
        return (
          <Post
            postId={data.id}
            postImg={data.Image.path}
            postTitle={data.title}
            userId={data.User.id}
            key={data.id}
            isActive={`user__${postFilter}`}
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

  filterClickHandler = (e) => {
    this.setState({ postFilter: e.target.innerText });
  };

  createFilterList = () => {
    const { postFilter } = this.state;
    return FILTER.user.map((option) => {
      return (
        <li key={option[1]}>
          <button
            className={cx(`userPage__header__rowTab__buttons__button`, {
              activated: postFilter === option[0],
            })}
            type="button"
            onClick={this.filterClickHandler}
          >
            {option[0]}
          </button>
        </li>
      );
    });
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

  render() {
    const { isMyPage, postFilter } = this.state;
    const { user } = this.props;
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
                className="userPage__header__thumb__edit"
              >
                <img src={EditButton} alt="editbutton" />
              </button>
            ) : null}
          </div>
          <div className="userPage__header__profile">
            <span className="userPage__header__profile__name">
              {user ? user.nickname : null}
            </span>
          </div>
          <div className="userPage__header__rowTab">
            <ul className="userPage__header__rowTab__buttons">
              <div className="userPage__header__rowTab__buttons__upload">
                {postFilter === FILTER.user[0][0] ? <Upload /> : null}
              </div>
              {this.createFilterList()}
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
