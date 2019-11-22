// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component, useState } from "react";
import cx from "classnames";
import logo from "../../logo.svg";
import "bootstrap/dist/css/bootstrap.css";

import { 
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
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
  AppBar,
  Button,
  Menu,
  MenuItem,
  Fade,
  Tooltip,
  useScrollTrigger
} from "@material-ui/core";

const defaultProps = {};
const propTypes = {};

const HideOnScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Fade in={!trigger} timeout={500}>
      {children}
    </Fade>
  );
}

const CollapseNavbar = (props) => {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <NavbarToggler onClick={toggleNavbar}>
    <Collapse isOpen={!collapsed}>
      {children}
    </Collapse>
    </NavbarToggler>

  );
}

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isActive } = this.props;
    return (
      <HideOnScroll>
        <AppBar>
          <Navbar className={cx(null, {
          "navBar__borderline-bottom": isActive !== "NotLoggedIn"
           })}> 
            <NavbarBrand className="navBar__logo " fixed="top">
              <NavLink className="navBar__logo__img" href="/">
                <img src={logo}  width="35px" alt="logo" />
              </NavLink>
              { isActive === "SignUp" || isActive === "LoggedIn" ? (
                <p className="navBar__logo__text">Bletcher</p>
              ) : null}
            </NavbarBrand>
            <Nav className="navBar__items" >
              { isActive === "NotLoggedIn" ? (
                <NavItem className="navBar__items__item">
                  <NavLink href ="/signup">Sign Up</NavLink>
                  <NavLink href="/about">About</NavLink>
                </NavItem>
              ) : null}
              { isActive === "LoggedIn" ? (
                <NavItem className="navBar__items__item">
                  <Tooltip title="Feed" aria-label="feed">
                    <NavLink href ="">
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
                      <NotificationsNoneOutlined alt="Notification"/>
                    </NavLink>
                  </Tooltip>
                  <Tooltip title="More" aria-label="more">
                    <NavLink href="">
                      <MoreHoriz alt="More"/>
                    </NavLink>
                  </Tooltip>
                </NavItem>
              ) : null}
            </Nav>
          </Navbar>
        </AppBar>
      </HideOnScroll>
    );
  }
}

NavBar.defaultProps = defaultProps;
NavBar.propTypes = propTypes;

export default NavBar;
