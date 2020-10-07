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
};
const propTypes = {
  getPosts: PropTypes.func.isRequired,
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
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (userId) => dispatch(getMainPosts(userId)),
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user,
    mainPost: state.fetchPostReducer.mainPost,
  };
};

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidUpdate(prevProps) {
    const { getPosts, user } = this.props;
    const { loading } = this.state;
    if (user !== prevProps.user && loading) {
      await getPosts(user.id);
      this.toggleLoadingState();
    }
  }

  toggleLoadingState() {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  }

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
      <div className="mainPage">
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
