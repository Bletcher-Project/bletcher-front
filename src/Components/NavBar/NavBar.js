// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import cx from "classnames";
import logo from "../../logo.svg";
import "bootstrap/dist/css/bootstrap.css";

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
  NotificationsNoneOutlined
} from "@material-ui/icons";
import {
  AppBar,
  Fade,
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
              <NavLink className="navBar__logo__img" href="/"><img src={logo}  width="35px" alt="logo" /></NavLink>
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
                  <NavLink href =""><DashboardOutlined alt="feed"/></NavLink>
                  <NavLink href=""><AccountCircleOutlined alt="My page"/></NavLink>
                  <NavLink href=""><NotificationsNoneOutlined alt="Notification"/></NavLink>
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
