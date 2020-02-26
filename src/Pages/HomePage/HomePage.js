import React, { Component } from "react";
import { connect } from "react-redux";

import { NavBar, Post } from "../../Components";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    isLogin: state.authReducer.isLogin,
    token: state.authReducer.token,
    user: state.authReducer.user
  };
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="homePage">
        <NavBar />
        <Post className="homePage__post" />
      </div>
    );
  }
}

HomePage.defaultProps = defaultProps;
HomePage.propTypes = propTypes;

export default connect(mapStateToProps)(HomePage);
