import React from 'react';
import PropTypes from 'prop-types';

import NoStyleButton from 'Components/Form/NoStyleButton';

import profile from 'Assets/images/profile/profile.png';
import profileActive from 'Assets/images/profile/profile-active.png';
import account from 'Assets/images/profile/account.png';
import accountActive from 'Assets/images/profile/account-active.png';
import bank from 'Assets/images/profile/bank.png';
import bankActive from 'Assets/images/profile/bank-active.png';
import noti from 'Assets/images/profile/noti.png';
import notiActive from 'Assets/images/profile/noti-active.png';
import info from 'Assets/images/profile/info.png';
import infoActive from 'Assets/images/profile/info-active.png';

import cx from 'classnames';

const defaultProps = {
  active: false,
};
const propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

function SidebarMenu(props) {
  const { icon, name, active, onClick } = props;

  const setIcon = (iconName, isActiveIcon) => {
    switch (iconName) {
      case 'profile':
        if (isActiveIcon) return profileActive;
        return profile;
      case 'account':
        if (isActiveIcon) return accountActive;
        return account;
      case 'bank':
        if (isActiveIcon) return bankActive;
        return bank;
      case 'noti':
        if (isActiveIcon) return notiActive;
        return noti;
      case 'info':
        if (isActiveIcon) return infoActive;
        return info;
      default:
        return profile;
    }
  };

  return (
    <NoStyleButton className="sidebarMenu" onClick={() => onClick()}>
      <img
        className="sidebarMenu__icon"
        src={setIcon(icon, active)}
        alt="menu-icon"
      />
      <span className={cx('sidebarMenu__name', active && 'active')}>
        {name}
      </span>
    </NoStyleButton>
  );
}

SidebarMenu.defaultProps = defaultProps;
SidebarMenu.propTypes = propTypes;

export default SidebarMenu;
