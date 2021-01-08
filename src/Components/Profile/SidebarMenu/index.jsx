import React from 'react';
import PropTypes from 'prop-types';

import profile from 'Assets/images/profile/profile.png';
import profile_active from 'Assets/images/profile/profile-active.png';
import account from 'Assets/images/profile/account.png';
import account_active from 'Assets/images/profile/account-active.png';
import bank from 'Assets/images/profile/bank.png';
import bank_active from 'Assets/images/profile/bank-active.png';
import noti from 'Assets/images/profile/noti.png';
import noti_active from 'Assets/images/profile/noti-active.png';
import info from 'Assets/images/profile/info.png';
import info_active from 'Assets/images/profile/info-active.png';

import cx from 'classnames';

const defaultProps = {
  active: false,
};
const propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

function SidebarMenu(props) {
  const { icon, name, active } = props;

  const setIcon = (iconName, active) => {
    switch (iconName) {
      case 'profile':
        if (active) return profile_active;
        return profile;
      case 'account':
        if (active) return account_active;
        return account;
      case 'bank':
        if (active) return bank_active;
        return bank;
      case 'noti':
        if (active) return noti_active;
        return noti;
      case 'info':
        if (active) return info_active;
        return info;
      default:
        return profile;
    }
  };

  return (
    <div className="sidebarMenu">
      <img
        className="sidebarMenu__icon"
        src={setIcon(icon, active)}
        alt="menu-icon"
      />
      <span className={cx('sidebarMenu__name', active && 'active')}>
        {name}
      </span>
    </div>
  );
}

SidebarMenu.defaultProps = defaultProps;
SidebarMenu.propTypes = propTypes;

export default SidebarMenu;
