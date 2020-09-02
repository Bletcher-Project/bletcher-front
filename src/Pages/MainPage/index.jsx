import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as PostAction from 'Redux/post';

import NavBar from 'Components/Common/NavBar';
import Jumbotron from 'Components/Common/Jumbotron';
import Loader from 'Components/Common/Loader';
import TempPost from 'Components/Post/__Post';
import Post from 'Components/Post/Post';
import MixButton from 'Components/Post/PostButton/MixButton';
import FavoriteButton from 'Components/Post/PostButton/FavoriteButton';

const defaultProps = {
  token: null,
};
const propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user,
  };
};

class MainPage extends Component {
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
    return feed.map((data) => (
      <TempPost
        key={data.id}
        postId={data.id}
        postTitle={data.title}
        postImg={data.Image.path}
        userId={data.User.id}
        isActive="main"
      />
    ));
  };

  render() {
    const { feed, feedLoading } = this.state;
    const tmp = (
      <>
        <MixButton />
        <FavoriteButton />
      </>
    );
    return (
      <div className="mainPage">
        <NavBar isActive="main" />
        <Jumbotron title="Find out" description="What other people painted" />

        {/* Test Post Component */}
        <div className="mainPage__test">
          {feed && !feedLoading ? (
            <>
              <Post
                postImg={feed[0].Image.path}
                postTitle={feed[0].title}
                hoverIcon={tmp}
              />
              <Post
                postImg={feed[1].Image.path}
                postTitle={feed[1].title}
                hoverIcon={tmp}
              />
            </>
          ) : null}
        </div>
        {/* <div className="mainPage__postList">
          {feed && !feedLoading ? this.renderPosts() : <Loader />}
        </div> */}
      </div>
    );
  }
}

MainPage.defaultProps = defaultProps;
MainPage.propTypes = propTypes;

export default connect(mapStateToProps)(MainPage);
