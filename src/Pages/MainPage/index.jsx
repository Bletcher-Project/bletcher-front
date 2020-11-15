import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getMainPosts } from 'Redux/fetch-post';

import NavBar from 'Components/Common/NavBar';
import Jumbotron from 'Components/Common/Jumbotron';
import Loader from 'Components/Common/Loader';
import Post from 'Components/Post/Post';
import PostList from 'Components/Post/PostList';
import MixButton from 'Components/Post/PostButton/MixButton';
import FavoriteButton from 'Components/Post/PostButton/FavoriteButton';

const defaultProps = {
  mainPost: null,
  user: null,
  token: null,
};
const propTypes = {
  getPosts: PropTypes.func.isRequired,
  mainPage: PropTypes.number.isRequired,
  mainPost: PropTypes.arrayOf(
    PropTypes.shape({
      post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        is_public: PropTypes.bool.isRequired,
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
      }),
      isFavorite: PropTypes.bool.isRequired,
    }).isRequired,
  ),
  mainWillFetch: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    introduce: PropTypes.string,
    profile_image: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }),
  token: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (userId, page) => dispatch(getMainPosts(userId, page)),
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user,
    mainPage: state.fetchPostReducer.mainPage,
    mainPost: state.fetchPostReducer.mainPost,
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
    const { getPosts, token, mainPage } = this.props;
    if (!token) {
      await getPosts(0, mainPage);
      this.toggleLoadingState();
    }
    window.addEventListener('scroll', this.infiniteScroll, true);
  }

  async componentDidUpdate(prevProps) {
    const { getPosts, user, token } = this.props;
    const { loading } = this.state;
    if (token && user !== prevProps.user && loading) {
      await getPosts(user.id);
      this.toggleLoadingState();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.infiniteScroll);
  }

  infiniteScroll = async () => {
    const { getPosts, mainPage, mainWillFetch } = this.props;
    const { scrollHeight, scrollTop } = document.body;
    const { clientHeight } = document.documentElement;

    if (mainWillFetch && scrollTop + clientHeight === scrollHeight) {
      await getPosts(0, mainPage);
    }
  };

  toggleLoadingState = () => {
    const { loading } = this.state;
    this.setState({ loading: !loading });
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
