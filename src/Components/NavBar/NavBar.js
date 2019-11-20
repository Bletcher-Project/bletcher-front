// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import logo from "../../logo.svg";
import { 
  Navbar,
  NavItem,
  NavLink,
  NavbarBrand,
  Nav
} from "reactstrap";
import cx from "classnames";
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import "bootstrap/dist/css/bootstrap.css";


const defaultProps = {};
const propTypes = {};

function HideOnScroll(props) {
  const { isActive } = props;
  const trigger = useScrollTrigger({disableHysteresis: true, threshold: 150});

  return (
    <Slide appear={false} direction="down" in={!trigger}>
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
                <NavLink href =""><DashboardOutlinedIcon alt="feed"/></NavLink>
                <NavLink href=""><AccountCircleOutlinedIcon alt="My page"/></NavLink>
                <NavLink href=""><NotificationsNoneOutlinedIcon alt="Notification"/></NavLink>
              </NavItem>
            ) : null}
          </Nav>
        </Navbar>
        </AppBar>
    </Slide>
  );
}

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const props = this.props;
    return (
      <HideOnScroll {...props}/>
    );
      
    
  }
}

NavBar.defaultProps = defaultProps;
NavBar.propTypes = propTypes;

export default NavBar;
