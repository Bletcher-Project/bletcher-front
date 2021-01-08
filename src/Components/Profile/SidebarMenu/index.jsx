import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {};
const propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

function SidebarMenu(props) {
  const { icon, name } = props;

  return (
    <div className="sidebarMenu">
      <img src={icon} alt="menu-icon" />
      <span>{name}</span>
    </div>
  );
}

SidebarMenu.defaultProps = defaultProps;
SidebarMenu.propTypes = propTypes;

export default SidebarMenu;
