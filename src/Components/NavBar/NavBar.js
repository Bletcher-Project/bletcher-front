// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import cx from "classnames";
import logo from "../../logo.svg";

import { Nav, Navbar, NavItem, NavLink, NavbarBrand } from "reactstrap";

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
      <Navbar
        className={cx(null, {
          "navBar__bordershadow-bottom": isActive !== "NotLoggedIn"
        })}
      >
        <NavbarBrand className="navBar__logo " fixed="top">
          <NavLink className="navBar__logo__img" href="/">
            <img src={logo} width="33px" alt="logo" />
          </NavLink>
          {isActive === "SignUp" || isActive === "SignnedIn" ? (
            <p className="navBar__logo__text">Bletcher</p>
          ) : null}
        </NavbarBrand>
        <Nav className="navBar__items">
          {isActive === "NotSignedIn" ? (
            <NavItem className="navBar__items__item">
              <NavLink href="/signup">Sign Up</NavLink>
              <NavLink href="/about">About</NavLink>
            </NavItem>
          ) : null}
          {isActive === "SignedIn" ? (
            <NavItem className="navBar__items__item">
              <NavLink href="">
                Feed
              </NavLink>
              <NavLink href="">
                MyPage
              </NavLink>
              <NavLink href="">
                Notification
              </NavLink>
              <NavLink href="">
                More
              </NavLink>
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
