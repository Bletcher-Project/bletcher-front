import React from 'react';
import icon from 'Assets/images/mixButton.png';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__menu">
        <img src={icon} alt="menu-icon" />
        <span>Profile</span>
      </div>
      <div className="sidebar__menu">
        <img src={icon} alt="menu-icon" />
        <span>Account</span>
      </div>
      <div className="sidebar__menu">
        <img src={icon} alt="menu-icon" />
        <span>Bank Account</span>
      </div>
      <div className="sidebar__menu">
        <img src={icon} alt="menu-icon" />
        <span>Notifications</span>
      </div>
      <div className="sidebar__menu">
        <img src={icon} alt="menu-icon" />
        <span>Information Protection</span>
      </div>
    </div>
  );
}

export default Sidebar;
