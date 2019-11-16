import React, { Component } from "react";

const defaultProps = {};
const propTypes = {};

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>This is User Page</div>;
  }
}

UserPage.defaultProps = defaultProps;
UserPage.propTypes = propTypes;

export default UserPage;
