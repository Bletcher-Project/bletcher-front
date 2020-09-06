import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as PostAction from 'Redux/post';

import NavBar from 'Components/Common/NavBar';
import Jumbotron from 'Components/Common/Jumbotron';
import Loader from 'Components/Common/Loader';
import Post from 'Components/Post/Post';
import PostList from 'Components/Post/PostList';

const defaultProps = {};
const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = () => {
  return {};
};

class NewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: null,
      feedLoading: true,
    };
  }

  componentDidMount() {
    this.getAllPosts();
  }

  getAllPosts = () => {
    const { dispatch } = this.props;
    dispatch(PostAction.getNewPosts()).then((result) => {
      this.setState({ feed: result, feedLoading: false });
    });
  };

  renderPosts = () => {
    const { feed } = this.state;
    return feed.map((data) => (
      <Post key={data.id} post={data} headerPosition="hidden" />
    ));
  };

  render() {
    const { feed, feedLoading } = this.state;
    return (
      <>
        <NavBar isActive="new" />
        <Jumbotron title="New" description="New works updated right now" />
        <PostList
          posts={feed && !feedLoading ? this.renderPosts() : <Loader />}
        />
      </>
    );
  }
}

NewPage.defaultProps = defaultProps;
NewPage.propTypes = propTypes;

export default connect(mapStateToProps)(NewPage);
