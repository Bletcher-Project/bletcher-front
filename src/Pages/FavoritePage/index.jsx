import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getFavoritePosts } from 'Redux/fetch-post';

import NavBar from 'Components/Common/NavBar';
import Jumbotron from 'Components/Common/Jumbotron';
import Post from 'Components/Post/Post';
import PostList from 'Components/Post/PostList';
import Loader from 'Components/Common/Loader';
import Button from 'Components/Form/Button';
import favEmpty from 'Assets/images/favorite-empty.png';

const defaultProps = {
  token: null,
  favoritePost: null,
};
const propTypes = {
  isLogin: PropTypes.bool.isRequired,
  token: PropTypes.string,
  getPosts: PropTypes.func.isRequired,
  favoritePost: PropTypes.arrayOf(
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
    }).isRequired,
  ),
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (token) => dispatch(getFavoritePosts(token)),
  };
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.authReducer.isLogin,
    token: state.authReducer.token,
    favoritePost: state.fetchPostReducer.favoritePost,
  };
};

class FavoritePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const { getPosts, isLogin, token } = this.props;
    if (isLogin) {
      await getPosts(token);
    }
    this.setState({ loading: false });
  }

  showEmptyStatus = () => {
    return (
      <div className="empty">
        <div className="empty__icon">
          <img src={favEmpty} alt="favorite-empty" />
          <span>Empty</span>
        </div>
        <div className="empty__guide">
          <p>There&apos;s no &quot;like&quot; work on the Favorite.</p>
          <p>Put your favorite work in it.</p>
        </div>
        <Button
          text="Going to see the artwork"
          size="medium"
          width="280px"
          href="/"
        />
      </div>
    );
  };

  renderPosts = () => {
    const { favoritePost } = this.props;
    if (favoritePost.length === 0) {
      return this.showEmptyStatus();
    }
    return favoritePost.map((data) => (
      <Post
        key={data.id}
        post={data}
        headerPosition="hidden"
        headerBackground
      />
    ));
  };

  render() {
    const { isLogin } = this.props;
    const { loading } = this.state;
    return (
      <>
        <NavBar isActive="favorite" />
        <Jumbotron title="Favorite" description="My favorite works" />
        {isLogin ? (
          <PostList posts={!loading ? this.renderPosts() : <Loader />} />
        ) : (
          <div>You must Sign In.</div>
        )}
      </>
    );
  }
}

FavoritePage.defaultProps = defaultProps;
FavoritePage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePage);
