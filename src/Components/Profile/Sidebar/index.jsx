import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SidebarMenu from 'Components/Profile/SidebarMenu';
import PROFILE_MENU_NAME from 'Constants/profile-menu';

const defaultProps = {};
const propTypes = {
  switchPage: PropTypes.func.isRequired,
};

function Sidebar(props) {
  const { switchPage } = props;
  const [isActive, setIsActive] = useState('profile');

  const handlePage = (dest) => {
    setIsActive(dest);
    switchPage(dest);
  };

  return (
    <div className="sidebar">
      {PROFILE_MENU_NAME.map((data) => {
        return (
          <SidebarMenu
            key={data.icon}
            icon={data.icon}
            name={data.menuName}
            active={isActive === data.icon}
            onClick={() => handlePage(data.icon)}
          />
        );
      })}
    </div>
  );
}

Sidebar.defaultProps = defaultProps;
Sidebar.propTypes = propTypes;

export default Sidebar;
