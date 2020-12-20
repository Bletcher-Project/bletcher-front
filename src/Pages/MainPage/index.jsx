import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { postType, userType } from 'PropTypes';

import { connect } from 'react-redux';
import { getMainPosts, initPosts } from 'Redux/fetch-post';

import NavBar from 'Components/Common/NavBar';
import Jumbotron from 'Components/Common/Jumbotron';
import Loader from 'Components/Common/Loader';
import Post from 'Components/Post/Post';
import PostList from 'Components/Post/PostList';
import MixButton from 'Components/Post/PostButton/MixButton';
import FavoriteButton from 'Components/Post/PostButton/FavoriteButton';

const defaultProps = {
  mainPost: [],
  user: null,
  token: null,
};
const propTypes = {
  getPosts: PropTypes.func.isRequired,
  init: PropTypes.func.isRequired,
  mainPost: postType.mainPost,
  mainPageNum: PropTypes.number.isRequired,
  mainWillFetch: PropTypes.bool.isRequired,
  user: userType,
  token: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (userId, pageNum) => dispatch(getMainPosts(userId, pageNum)),
    init: () => dispatch(initPosts()),
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user,
    mainPost: state.fetchPostReducer.mainPost,
    mainPageNum: state.fetchPostReducer.mainPageNum,
    mainWillFetch: state.fetchPostReducer.mainWillFetch,
  };
};

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const { token, user, init } = this.props;

    await init();
    if (!token) {
      this.fetchMainPosts(0);
    } else if (user) {
      this.fetchMainPosts(user.id);
    }

    window.addEventListener('scroll', this.infiniteScroll, true);
  }

  componentDidUpdate(prevProps) {
    const { token, user } = this.props;

    if (user !== prevProps.user) {
      if (!token) {
        this.fetchMainPosts(0);
      } else if (user) {
        this.fetchMainPosts(user.id);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.infiniteScroll);
  }

  infiniteScroll = async () => {
    const { user, mainWillFetch } = this.props;
    const { scrollHeight, scrollTop } = document.body;
    const { clientHeight } = document.documentElement;

    if (mainWillFetch && scrollTop + clientHeight === scrollHeight) {
      if (user) {
        this.fetchMainPosts(user.id);
      } else {
        this.fetchMainPosts(0);
      }
    }
  };

  fetchMainPosts = async (userId) => {
    const { getPosts, mainPageNum } = this.props;

    await getPosts(userId, mainPageNum);
    this.setState({ loading: false });
  };

  renderPosts = () => {
    const { mainPost } = this.props;
    return mainPost.map((data) => (
      <Post
        key={data.post.id}
        post={data.post}
        hoverIcon={
          <>
            <MixButton />
            <FavoriteButton postId={data.post.id} liked={data.isFavorite} />
          </>
        }
        headerPosition="hidden"
        headerBackground
      />
    ));
  };

  render() {
    const { loading } = this.state;
    return (
      <div
        className="mainPage"
        ref={(main) => {
          this.main = main;
        }}
      >
        <NavBar isActive="main" />
        <Jumbotron title="Find out" description="What other people painted" />
        <PostList posts={!loading ? this.renderPosts() : <Loader />} />
      </div>
    );
  }
}

MainPage.defaultProps = defaultProps;
MainPage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
