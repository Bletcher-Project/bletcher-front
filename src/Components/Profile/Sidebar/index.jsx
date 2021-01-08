import React from 'react';

import SidebarMenu from 'Components/Profile/SidebarMenu';

import profileIcon from 'Assets/images/profile/profile.png';
import accountIcon from 'Assets/images/profile/account.png';
import bankIcon from 'Assets/images/profile/bank.png';
import notiIcon from 'Assets/images/profile/noti.png';
import infoIcon from 'Assets/images/profile/info.png';

function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarMenu icon={profileIcon} name="Profile" />
      <SidebarMenu icon={accountIcon} name="Account" />
      <SidebarMenu icon={bankIcon} name="Bank Account" />
      <SidebarMenu icon={notiIcon} name="Notifications" />
      <SidebarMenu icon={infoIcon} name="Information Protection" />
    </div>
  );
}

export default Sidebar;
