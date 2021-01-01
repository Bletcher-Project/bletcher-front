import React from 'react';

import NavBar from 'Components/Common/NavBar';
import Sidebar from 'Components/Profile/Sidebar';
import Profile from 'Components/Profile/Profile';

const defaultProps = {};
const propTypes = {};

function ProfilePage() {
  return (
    <>
      <NavBar isActive="profile" />
      <div className="profilePage">
        <div className="profilePage__sidebar">
          <Sidebar />
        </div>
        <div className="profilePage__content">
          <Profile />
        </div>
      </div>
    </>
  );
}

ProfilePage.defaultProps = defaultProps;
ProfilePage.propTypes = propTypes;

export default ProfilePage;
