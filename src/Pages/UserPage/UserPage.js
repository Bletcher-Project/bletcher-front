import React, { Component } from "react";

import { NavBar } from "../../Components";

const defaultProps = {};
const propTypes = {};

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="userPage"><NavBar isActive="user" /></div>;
  }
}

UserPage.defaultProps = defaultProps;
UserPage.propTypes = propTypes;

export default UserPage;
