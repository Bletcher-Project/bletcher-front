import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getMainPosts } from 'Redux/fetch-post';
import { signOut } from 'Redux/auth';

import NavBar from 'Components/Common/NavBar';
import Jumbotron from 'Components/Common/Jumbotron';
import Loader from 'Components/Common/Loader';
import Post from 'Components/Post/Post';
import PostList from 'Components/Post/PostList';
import MixButton from 'Components/Post/PostButton/MixButton';
import FavoriteButton from 'Components/Post/PostButton/FavoriteButton';

const defaultProps = {
  mainPost: null,
};
const propTypes = {
  getPosts: PropTypes.func.isRequired,
  mainPost: PropTypes.arrayOf(
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
    getPosts: () => dispatch(getMainPosts()),
    tmpSignOut: () => dispatch(signOut()),
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

  async componentDidMount() {
    const { getPosts } = this.props;
    await getPosts();
    this.setState({ loading: false });
  }

  renderPosts = () => {
    const { mainPost } = this.props;
    return mainPost.map((data) => (
      <>
        <Post
          key={data.id}
          post={data}
          hoverIcon={
            <>
              <MixButton />
              <FavoriteButton postId={data.id} liked={false} />
            </>
          }
          headerPosition="hidden"
          headerBackground
        />
      </>
    ));
  };

  outHandler = async () => {
    const { tmpSignOut } = this.props;
    await tmpSignOut();
    window.location.reload();
  };

  render() {
    const { loading } = this.state;
    return (
      <div className="mainPage">
        <NavBar isActive="main" />
        <Jumbotron title="Find out" description="What other people painted" />
        <button type="button" onClick={this.outHandler}>
          OUT
        </button>
        <PostList posts={!loading ? this.renderPosts() : <Loader />} />
      </div>
    );
  }
}

MainPage.defaultProps = defaultProps;
MainPage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
