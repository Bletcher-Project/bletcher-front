// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import cx from "classnames";
import logo from "../../logo.svg";

import { 
  Nav,
  Navbar,
  NavItem,
  NavLink,
  NavbarBrand
} from "reactstrap";
import {
  DashboardOutlined,
  AccountCircleOutlined,
  NotificationsNoneOutlined,
  MoreHoriz
} from "@material-ui/icons";
import {
  Tooltip
} from "@material-ui/core";

const defaultProps = {};
const propTypes = {};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isActive } = this.props;
    return (
      <Navbar className={cx(null, {
        "navbar__borderline-bottom": isActive !== "NotLoggedIn"
      })}>
        <NavbarBrand className="navbar__logo " fixed="top">
          <NavLink className="navbar__logo__img" href="/">
            <img src={logo} width="35px" alt="logo" />
          </NavLink>
          {isActive === "SignUp" || isActive === "SignnedIn" ? (
            <p className="navbar__logo__text">Bletcher</p>
          ) : null}
        </NavbarBrand>
        <Nav className="navbar__items" >
          {isActive === "NotLoggedIn" ? (
            <NavItem className="navbar__items__item">
              <NavLink href="/signup">Sign Up</NavLink>
              <NavLink href="/about">About</NavLink>
            </NavItem>
          ) : null}
          {isActive === "SignnedIn" ? (
            <NavItem className="navbar__items__item">
              <Tooltip title="Feed" aria-label="feed">
                <NavLink href="">
                  <DashboardOutlined alt="feed" />
                </NavLink>
              </Tooltip>
              <Tooltip title="My page" aria-label="my page">
                <NavLink href="">
                  <AccountCircleOutlined alt="My page" />
                </NavLink>
              </Tooltip>
              <Tooltip title="Notification" aria-label="notification">
                <NavLink href="">
                  <NotificationsNoneOutlined alt="Notification" />
                </NavLink>
              </Tooltip>
              <Tooltip title="More" aria-label="more">
                <NavLink href="">
                  <MoreHoriz alt="More" />
                </NavLink>
              </Tooltip>
            </NavItem>
          ) : null}
        </Nav>
      </Navbar>
    );
  }
}

NavBar.defaultProps = defaultProps;
NavBar.propTypes = propTypes;

export default NavBar;
