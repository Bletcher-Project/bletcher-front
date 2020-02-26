import React, { Component } from "react";

import { connect } from "react-redux";
import * as PostAction from "../../Redux/Actions/PostAction";

import { NavBar, Post } from "../../Components";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    isLogin: state.authReducer.isLogin,
    token: state.authReducer.token,
    user: state.authReducer.user,
    feed: state.postReducer.feed
  };
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { feed: null, feedLoading: true };
  }

  componentWillMount() {
    this.getAllPosts();
  }

  render() {
    return (
      <div className="homePage">
        <NavBar />
        <div className="homePage__feed">
          {
            !this.state.feedLoading
              ? this.state.feed.map((data, index) => {
                return (
                  <Post className="homePage__post" />
                );
              })
              : null
          }
        </div>
        {/* <Post className="homePage__post" /> */}
      </div>
    );
  }

  getAllPosts = () => {
    this.props.dispatch(PostAction.getAllPosts()).then(result => {
      this.setState({ feed: result, feedLoading: false });
    });
  }
}

HomePage.defaultProps = defaultProps;
HomePage.propTypes = propTypes;

export default connect(mapStateToProps)(HomePage);
