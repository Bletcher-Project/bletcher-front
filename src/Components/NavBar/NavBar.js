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
import "bootstrap/dist/css/bootstrap.css";


const defaultProps = {};
const propTypes = {};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {} ;
  }

  render() {
    const { isActive } = this.props;
    return (
      <Navbar className={cx(null, {
        "navBar__borderline-bottom": isActive !== "main"
      })}> 
        <NavbarBrand className="navBar__logo " fixed="top">
          <NavLink className="navBar__logo__img" href="/"><img src={logo}  width="35px" alt="logo" /></NavLink>
          { isActive === "signup" ? (
            <p className="navBar__logo__text">Bletcher</p>
          ) : null}
        </NavbarBrand>
        <Nav className="navBar__items" >
          { isActive === "main" ? (
            <NavItem className="navBar__items__item">
              <NavLink href ="/signup">Sign Up</NavLink>
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
