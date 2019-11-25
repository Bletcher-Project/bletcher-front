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
          navBar__shadow: isActive !== "main"
        })}
      >
        <NavbarBrand className="navBar__logo " fixed="top">
          <NavLink className="navBar__logo-img" href="/">
            <img src={logo} width="33px" alt="logo" />
          </NavLink>
          {isActive !== "main" ? (
            <p className="navBar__logo-text">Bletcher</p>
          ) : null}
        </NavbarBrand>
        <Nav className="navBar__items">
          {isActive === "main" ? (
            <NavItem className="navBar__items__item">
              <NavLink href="/signup">Sign Up</NavLink>
              <NavLink href="/about">About</NavLink>
            </NavItem>
          ) : (
            <NavItem className="navBar__items__item">
              <NavLink href="">Feed</NavLink>
              <NavLink href="">MyPage</NavLink>
              <NavLink href="">Notification</NavLink>
              <NavLink href="">More</NavLink>
            </NavItem>
          )}
        </Nav>
      </Navbar>
    );
  }
}

NavBar.defaultProps = defaultProps;
NavBar.propTypes = propTypes;

export default NavBar;
