import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import * as AuthAction from "Redux/Actions/AuthAction";

import cx from "classnames";
import logo from "logo.svg";

import { Nav, Navbar, NavItem, NavLink, NavbarBrand } from "reactstrap";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isActive } = this.props;
    return (
      <Navbar
        className={cx("navBar", { "navBar__primary": isActive !== "main" })}
        light
        fixed="true"
        expand="md"
      >
        <NavbarBrand className="navBar__logo col-2 ml-5" href="/">
          <img src={logo} width="33px" alt="logo" />
          {isActive === "main" ? null : <span>Bletcher</span>}
        </NavbarBrand>
        {isActive === "main" ? (
          <Nav className="ml-auto mr-5" navbar>
            <NavItem>
              <NavLink href="/signup">Sign Up</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">About</NavLink>
            </NavItem>
          </Nav>
        ) : isActive === "signUp" ? (
          <Nav className="ml-auto mr-5" navbar>
            <NavItem>
              <NavLink href="/signin">Sign In</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">About</NavLink>
            </NavItem>
          </Nav>
        ) : (
              <Nav className="ml-auto mr-3" navbar>
                <NavItem>
                  <NavLink href="/home" active={isActive === "feed"}>Feed</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" active={isActive === "user"} onClick={this.handleUserPage}>MyPage</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" onClick={this.handleSignOut}>SignOut</NavLink>
                </NavItem>
              </Nav>
            )}
      </Navbar>
    );
  }

  handleUserPage = () => {
    this.props.history.push({ pathname: "/" + this.props.user.name })
  }

  handleSignOut = () => {
    this.props.dispatch(AuthAction.signOut()).then(async result => {
      this.props.history.push({ pathname: "/" });
    });
  }
}

NavBar.defaultProps = defaultProps;
NavBar.propTypes = propTypes;

export default withRouter(connect(mapStateToProps)(NavBar));
