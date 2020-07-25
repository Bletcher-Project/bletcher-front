import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import { Nav, Navbar, NavItem, NavLink, NavbarBrand } from 'reactstrap';

import { connect } from 'react-redux';
import * as AuthAction from 'Redux/auth';

import cx from 'classnames';
import logo from 'Assets/logo/logo.svg';
import { shopCart, person } from 'Assets/icons/svg';
import Search from 'Components/Search';

const defaultProps = {
  user: null,
};
const propTypes = {
  isActive: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  user: PropTypes.node,
};

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleUserPage = () => {
    const { history, user } = this.props;
    history.push({ pathname: `user/${user.name}` });
  };

  handleSignOut = () => {
    const { dispatch, history } = this.props;
    dispatch(AuthAction.signOut()).then(async () => {
      history.push({ pathname: '/' });
    });
  };

  handleFundingPage = () => {
    const { history } = this.props;
    history.push({ pathname: '/funding' });
  };

  handleFavoritePage = () => {
    const { history } = this.props;
    history.push({ pathname: '/favorite' });
  };

  handleShopPage = () => {
    const { history } = this.props;
    history.push({ pathname: '/shop' });
  };

  handleCartPage = () => {
    const { history } = this.props;
    history.push({ pathname: '/cart' });
  };

  getActiveNav = (isActive) => {
    const { history, location, match } = this.props;
    switch (isActive) {
      case 'main':
        return (
          <Nav className="ml-auto mr-5" navbar>
            <NavItem>
              <NavLink href="/signup">Sign Up</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">About</NavLink>
            </NavItem>
          </Nav>
        );
      case 'signUp':
        return (
          <Nav className="ml-auto mr-5" navbar>
            <NavItem>
              <NavLink href="/signin">Sign In</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">About</NavLink>
            </NavItem>
          </Nav>
        );
      default:
        return (
          <>
            <Nav className="ml-auto mr-4" navbar>
              <NavItem>
                <NavLink href="/home" active={isActive === 'feed'}>
                  New
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  active={isActive === 'funding'}
                  onClick={this.handleFundingPage}
                >
                  Funding
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  active={isActive === 'favorite'}
                  onClick={this.handleFavoritePage}
                >
                  Favorite
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  active={isActive === 'shop'}
                  onClick={this.handleShopPage}
                >
                  Shop
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto mr-4" navbar>
              <Search history={history} match={match} location={location} />
              <NavItem>
                <NavLink
                  href="#"
                  active={isActive === 'cart'}
                  onClick={this.handleCartPage}
                >
                  {shopCart}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  active={isActive === 'user'}
                  onClick={this.handleUserPage}
                >
                  {person}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.handleSignOut}>
                  Bye
                </NavLink>
              </NavItem>
            </Nav>
          </>
        );
    }
  };

  render() {
    const { isActive } = this.props;
    return (
      <>
        <Navbar
          className={cx('navBar', { navBar__primary: isActive !== 'main' })}
          light
          fixed="true"
          expand="md"
        >
          <NavbarBrand className="navBar__logo col-2 ml-5" href="/">
            <img src={logo} width="33px" alt="logo" />
            {isActive === 'main' || <span>Bletcher</span>}
          </NavbarBrand>

          {this.getActiveNav(isActive)}
        </Navbar>
      </>
    );
  }
}

NavBar.defaultProps = defaultProps;
NavBar.propTypes = propTypes;

export default withRouter(connect(mapStateToProps)(NavBar));
