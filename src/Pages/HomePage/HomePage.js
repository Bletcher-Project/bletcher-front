import React, { Component } from "react";

import { NavBar, Post } from "../../Components";

const defaultProps = {};
const propTypes = {};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="homePage">
        <NavBar /> <Post className="homePage__post" />
      </div>
    );
  }
}

HomePage.defaultProps = defaultProps;
HomePage.propTypes = propTypes;

export default HomePage;
