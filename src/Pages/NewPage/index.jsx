import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getNewPosts } from 'Redux/fetch-post';

import NavBar from 'Components/Common/NavBar';
import Jumbotron from 'Components/Common/Jumbotron';
import Loader from 'Components/Common/Loader';
import Post from 'Components/Post/Post';
import PostList from 'Components/Post/PostList';

const defaultProps = {
  newPost: null,
};
const propTypes = {
  getPosts: PropTypes.func.isRequired,
  newPost: PropTypes.arrayOf(
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
    getPosts: () => dispatch(getNewPosts()),
  };
};

const mapStateToProps = (state) => {
  return {
    newPost: state.fetchPostReducer.newPost,
  };
};

class NewPage extends Component {
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
    const { newPost } = this.props;
    return newPost.map((data) => (
      <Post key={data.id} post={data} headerPosition="hidden" />
    ));
  };

  render() {
    const { loading } = this.state;
    return (
      <>
        <NavBar isActive="new" />
        <Jumbotron title="New" description="New works updated right now" />
        <PostList posts={!loading ? this.renderPosts() : <Loader />} />
      </>
    );
  }
}

NewPage.defaultProps = defaultProps;
NewPage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(NewPage);
