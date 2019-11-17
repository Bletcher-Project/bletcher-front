import React, { Component } from "react";

import logo from "../../logo.svg";

import { NavBar } from "../../Components";

const defaultProps = {};
const propTypes = {};

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="mainPage">
        <NavBar isStart></NavBar>
        <img src={logo} width="40px" alt="logo" />
        This is Main Page.
      </div>
    );
  }
}

MainPage.defaultProps = defaultProps;
MainPage.propTypes = propTypes;

export default MainPage;
