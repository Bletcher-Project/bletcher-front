import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getFavoritePosts } from 'Redux/fetch-post';

import NavBar from 'Components/Common/NavBar';
import Jumbotron from 'Components/Common/Jumbotron';
import Post from 'Components/Post/Post';

const defaultProps = {};
const propTypes = {};

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
    this.state = {};
  }

  async componentDidMount() {
    const { getPosts, isLogin, token } = this.props;
    if (isLogin) {
      await getPosts(token);
    }

    console.log(this.props.favoritePost);
    // this.setState({ loading: false });
  }

  renderPosts = () => {
    const { favoritePost } = this.props;
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
    return (
      <>
        <NavBar isActive="favorite" />
        <Jumbotron title="Favorite" description="My favorite works" />
      </>
    );
  }
}

FavoritePage.defaultProps = defaultProps;
FavoritePage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePage);
