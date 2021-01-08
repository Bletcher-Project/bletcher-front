import React from 'react';

import SidebarMenu from 'Components/Profile/SidebarMenu';
import PROFILE_MENU_NAME from 'Constants/profile-menu';

function Sidebar() {
  return (
    <div className="sidebar">
      {PROFILE_MENU_NAME.map((data) => {
        return (
          <SidebarMenu
            key={data.icon}
            icon={data.icon}
            name={data.menuName}
            active={data.icon === 'profile'}
          />
        );
      })}
    </div>
  );
}

export default Sidebar;
