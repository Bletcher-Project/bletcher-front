import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { postType } from 'PropTypes';

import { connect } from 'react-redux';
import { getFavoritePosts } from 'Redux/fetch-post';

import NavBar from 'Components/Common/NavBar';
import Jumbotron from 'Components/Common/Jumbotron';
import Post from 'Components/Post/Post';
import PostList from 'Components/Post/PostList';
import Loader from 'Components/Common/Loader';
import Button from 'Components/Form/Button';
import SignInModal from 'Components/Sign/SignInModal';
import favEmpty from 'Assets/images/favorite-empty.png';

const defaultProps = {
  token: null,
  favoritePost: null,
};
const propTypes = {
  isLogin: PropTypes.bool.isRequired,
  token: PropTypes.string,
  getPosts: PropTypes.func.isRequired,
  favoritePost: postType.favoritePost,
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
      <div className="favoritePage__empty">
        <div className="favoritePage__empty__icon">
          <img src={favEmpty} alt="favorite-empty" />
          <span>Empty</span>
        </div>
        <div className="favoritePage__empty__guide">
          <p>There&apos;s no &quot;like&quot; work on the Favorite.</p>
          <p>Put your favorite work in it.</p>
        </div>
        <Button
          text="Going to see the artwork"
          size="medium"
          width="280px"
          href="/"
          white
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
          <SignInModal />
        )}
      </>
    );
  }
}

FavoritePage.defaultProps = defaultProps;
FavoritePage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePage);
