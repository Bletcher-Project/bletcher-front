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
import "bootstrap/dist/css/bootstrap.css";


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
        <NavbarBrand className="navBar__logo" fixed="top">
          <NavLink href="/"><img src={logo}  width="40px" alt="logo" /></NavLink>
          {isSignup === true ? (
            <p className="navBar__logo__text">Bletcher</p>
          ) : null}
        </NavbarBrand>
        <Nav className="navBar__items" >
          {isStart === true ? (
            <NavItem className="navBar__items__item">
              <NavLink href ="/signup">Sign Up</NavLink>
            </NavItem>
          ) : null}
          {isStart === true ? (
            <NavItem className="navBar__itmes__item">
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
