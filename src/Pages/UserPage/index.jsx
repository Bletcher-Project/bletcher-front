import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import cx from 'classnames';

import { connect } from 'react-redux';
import * as PostAction from 'Redux/post';

import NavBar from 'Components/Common/NavBar';
import Loader from 'Components/Common/Loader';
import Thumbnail from 'Components/Thumbnail';
import Post from 'Components/Post/Post';
import PostList from 'Components/Post/PostList';
import MixButton from 'Components/Post/PostButton/MixButton';
import ShareButton from 'Components/Post/PostButton/ShareButton';
import Upload from 'Components/Upload/UploadPost';

import FILTER from 'Constants/filter-option';
import EditButton from 'Assets/images/editButton.png';

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
      feedLoading: true,
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
    dispatch(PostAction.getPostByUserId(userInfo.nickname, token)).then(
      (result) => {
        this.setState({ userPostImgs: result });
      },
    );
    this.setState({ feedLoading: false });
  };

  getPostByFilter = (filter, data) => {
    let icon;
    let position;
    if (filter === 'me') {
      icon = <MixButton />;
      position = 'both';
    } else {
      icon = <ShareButton />;
      position = 'bottom';
    }
    return (
      <Post
        post={data}
        key={data.id}
        hoverIcon={icon}
        headerBackground={false}
        headerPosition={position}
      />
    );
  };

  showUserPosts = () => {
    const { userPostImgs, postFilter } = this.state;
    return userPostImgs.map((data) => this.getPostByFilter(postFilter, data));
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
    const { isMyPage, postFilter, feedLoading, userPostImgs } = this.state;
    const { user } = this.props;
    return (
      <div className="userPage">
        <NavBar isActive={isMyPage ? 'user' : ''} />
        <div className="userPage__header">
          <div className="userPage__header__thumb">
            <Thumbnail size="100" />
            {isMyPage ? (
              <button
                type="button"
                onClick={this.editUserProfile}
                className="userPage__header__thumb__edit"
              >
                <img src={EditButton} alt="O" />
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

        <PostList
          posts={
            !feedLoading && userPostImgs ? this.showUserPosts() : <Loader />
          }
        />
      </div>
    );
  }
}

UserPage.defaultProps = defaultProps;
UserPage.propTypes = propTypes;

export default connect(mapStateToProps)(UserPage);
