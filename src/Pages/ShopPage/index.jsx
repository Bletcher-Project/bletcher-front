import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as PostAction from 'Redux/post';

import NavBar from 'Components/Common/NavBar';
import Loader from 'Components/Common/Loader';
import Jumbotron from 'Components/Common/Jumbotron';
import Post from 'Components/Post/Post';
import PostList from 'Components/Post/PostList';

const defaultProps = {
  token: null,
};
const propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string,
};

class ShopPage extends Component {
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
    const { dispatch, token } = this.props;
    dispatch(PostAction.getAllPosts(token)).then((result) => {
      this.setState({ feed: result, feedLoading: false });
    });
  };

  renderPosts = () => {
    const { feed } = this.state;
    return feed.map((data) => {
      return (
        <Post
          post={data}
          key={data.id}
          footerOption="shop"
          headerPosition={null}
        />
      );
    });
  };

  render() {
    const { feed, feedLoading } = this.state;
    return (
      <>
        <>
          <NavBar isActive="shop" />
          <Jumbotron title="Bletcher Shop" />
          <div className="shopPage">
            <PostList
              posts={feed && !feedLoading ? this.renderPosts() : <Loader />}
            />
          </div>
        </>
      </>
    );
  }
}

ShopPage.defaultProps = defaultProps;
ShopPage.propTypes = propTypes;

export default connect()(ShopPage);
