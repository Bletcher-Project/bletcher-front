import React, { useState } from 'react';

import NavBar from 'Components/Common/NavBar';
import Sidebar from 'Components/Profile/Sidebar';
import Profile from 'Components/Profile/Contents/Profile';
import Account from 'Components/Profile/Contents/Account';
import Bank from 'Components/Profile/Contents/Bank';
import Noti from 'Components/Profile/Contents/Noti';
import Info from 'Components/Profile/Contents/Info';

function ProfilePage() {
  const [content, setContent] = useState('profile');

  const switchPage = (dest) => {
    setContent(dest);
  };

  const renderContent = () => {
    switch (content) {
      case 'profile':
        return <Profile />;
      case 'account':
        return <Account />;
      case 'bank':
        return <Bank />;
      case 'noti':
        return <Noti />;
      case 'info':
        return <Info />;
      default:
        return null;
    }
  };

  return (
    <>
      <NavBar isActive="profile" />
      <div className="profilePage">
        <div className="profilePage__sidebar">
          <Sidebar switchPage={(dest) => switchPage(dest)} />
        </div>
        <div className="profilePage__content">{renderContent()}</div>
      </div>
    </>
  );
}

export default ProfilePage;
