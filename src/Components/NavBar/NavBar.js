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

const defaultProps = {};
const propTypes = {};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {} ;
  }

  render() {
    const { isStart, isSignup } = this.props;
    return (
      <Navbar>
        <NavbarBrand>
          <img src={logo} width="40px" alt="logo" />
          {isSignup === true ? (
            <span>bletcher</span>
          ) : null}
        </NavbarBrand>

        <Nav>
          {isStart === true ? (
            <NavItem>
              <NavLink href ="/signup">Sign Up</NavLink>
            </NavItem>
          ) : null}
          {isStart === true ? (
            <NavItem>
              <NavLink href="/about">About</NavLink>
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
