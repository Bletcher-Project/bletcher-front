import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';
import { getUserPosts } from 'Redux/fetch-post';
import { getPostByPostId } from 'Redux/post';

import NavBar from 'Components/Common/NavBar';
import Loader from 'Components/Common/Loader';
import MixHandler from 'Components/Mix/MixHandler';
import Thumbnail from 'Components/Thumbnail';
import Post from 'Components/Post/Post';
import PostList from 'Components/Post/PostList';
import MixButton from 'Components/Post/PostButton/MixButton';
import ShareButton from 'Components/Post/PostButton/ShareButton';
import Upload from 'Components/Upload/UploadPost';

import USER_OPTION from 'Constants/userpage-option';
import EditButton from 'Assets/images/editButton.png';

import camelCase from 'camelcase';
import { Modal } from 'reactstrap';

import cx from 'classnames';

const defaultProps = {
  user: {},
  token: '',
  userPosts: {},
};
const propTypes = {
  getPostById: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    nickname: PropTypes.string,
    introduce: PropTypes.string,
    profile_image: PropTypes.string,
    password: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  token: PropTypes.string,
  history: ReactRouterPropTypes.history.isRequired,
  userPosts: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        Category: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }),
        Image: PropTypes.shape({
          id: PropTypes.number.isRequired,
          path: PropTypes.string,
        }),
        User: PropTypes.shape({
          id: PropTypes.number.isRequired,
          nickname: PropTypes.string.isRequired,
        }),
        created_at: PropTypes.string.isRequired,
        description: PropTypes.string,
        id: PropTypes.number.isRequired,
        is_public: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
      }),
    ),
  ),
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user,
    userPosts: state.fetchPostReducer.userPosts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (tabOption, userInfo, token) => {
      dispatch(getUserPosts(tabOption, userInfo, token));
    },
    getPostById: (postId, token) => {
      return dispatch(getPostByPostId(postId, token));
    },
  };
};

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMyPage: false,
      userInfo: null,
      postOption: 'me',
      feedLoading: true,
      isMixModalOpen: false,
      chosenOriginPost: null,
      chosenSubPost: null,
    };
  }

  setUser = async () => {
    const { match, user } = this.props;
    if (match.params.username === user.nickname) {
      await new Promise((accept) =>
        this.setState({ userInfo: user, isMyPage: true }, accept),
      );
    } else {
      // Other UserPage
      // TODO::Jinny- get other userinfo without fetch redux 'user'
    }
  };

  getUserPosts = async (option) => {
    const { token, getPosts } = this.props;
    const { userInfo } = this.state;

    option.map(async (elem) => {
      await getPosts(elem[0], userInfo, token);
    });

    this.setState({ feedLoading: false });
  };

  getPostByOption = (option, data) => {
    let icon;
    let position;
    if (option === 'me') {
      icon = <MixButton onClick={() => this.mixModalHandler(data.id)} />;
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
    const { postOption } = this.state;
    const { userPosts } = this.props;
    const userPostImgs = userPosts[camelCase(postOption)];
    return userPostImgs.map((data) => this.getPostByOption(postOption, data));
  };

  editUserProfile = () => {
    const { history, match } = this.props;
    history.push({ pathname: `${match.url}/profile` });
  };

  filterClickHandler = (e) => {
    this.setState({ postOption: e.target.innerText });
  };

  createFilterList = () => {
    const { postOption } = this.state;
    return USER_OPTION.map((option) => {
      return (
        <li key={option[1]}>
          <button
            className={cx(`userPage__header__rowTab__buttons__button`, {
              activated: postOption === option[0],
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

  mixModalHandler = async (postId) => {
    const { token, getPostById } = this.props;
    const tmp = await getPostById(postId, token);
    this.setState({ isMixModalOpen: true, chosenOriginPost: tmp });
  };

  postSubPost = async (subPost) => {
    await new Promise((accept) =>
      this.setState({ chosenSubPost: subPost }, accept),
    );
  };

  componentDidMount = async () => {
    const { user } = this.props;
    if (user) {
      await this.setUser();
      await this.getUserPosts(USER_OPTION);
    }
  };

  toggle = () => {
    const { isMixModalOpen } = this.state;
    this.setState({ isMixModalOpen: !isMixModalOpen });
  };

  componentDidUpdate = async (prevProps) => {
    const { token, user, match } = this.props;
    if (
      (token && user !== prevProps.user) ||
      prevProps.match.params.username !== match.params.username
    ) {
      await this.setUser();
      await this.getUserPosts(USER_OPTION);
    }
  };

  render() {
    const {
      isMyPage,
      postOption,
      feedLoading,
      isMixModalOpen,
      chosenOriginPost,
      chosenSubPost,
    } = this.state;
    const { user, userPosts } = this.props;
    return (
      <div className="userPage">
        <NavBar isActive={isMyPage ? 'user' : ''} />
        <div className="userPage__header">
          <div className="userPage__header__thumb">
            <Thumbnail
              src={user ? user.profile_image : null}
              userName={user ? user.nickname : null}
              size={100}
            />
            {isMyPage ? (
              <button
                type="button"
                onClick={this.editUserProfile}
                className="userPage__header__thumb__edit"
              >
                <img src={EditButton} alt="edit" />
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
                {postOption === USER_OPTION[0][0] ? <Upload /> : null}
              </div>
              {this.createFilterList()}
            </ul>
          </div>
        </div>

        <PostList
          posts={!feedLoading && userPosts ? this.showUserPosts() : <Loader />}
        />
        <Modal isOpen={isMixModalOpen} toggle={this.toggle}>
          <MixHandler
            chosenSubPost={chosenSubPost}
            chosenOriginPost={chosenOriginPost}
            subPostFunc={this.postSubPost}
          />
        </Modal>
      </div>
    );
  }
}

UserPage.defaultProps = defaultProps;
UserPage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
