import React, { Component } from "react";

import { NavBar, Thumbnail } from "../../Components";

const defaultProps = {};
const propTypes = {};

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="userPage">
        <NavBar isActive="user" />
        <div className="mt-5 pt-5 ml-5">
          <Thumbnail size="150" src={null} />
        </div>
      </div>
    );
  }
}

UserPage.defaultProps = defaultProps;
UserPage.propTypes = propTypes;

export default UserPage;
