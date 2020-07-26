import React, { Component } from 'react';

import NavBar from 'Components/Main/NavBar';

const defaultProps = {};
const propTypes = {};

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <NavBar isActive="profile" />
        <div className="profilePage">
          <div className="profilePage__Header">This is ProfilePage.</div>
          <div className="profilePage__Content" />
        </div>
      </>
    );
  }
}

ProfilePage.defaultProps = defaultProps;
ProfilePage.propTypes = propTypes;

export default ProfilePage;
