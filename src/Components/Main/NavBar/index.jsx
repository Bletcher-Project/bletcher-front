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
  user: PropTypes.objectOf(PropTypes.object),
};

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};

class NavBar extends Component {
  destPage = {
    feed: 'feed',
    funding: 'funding',
    favorite: 'favorite',
    shop: 'shop',
    cart: 'cart',
    userInfo: 'user',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  getNavLink = (isActive, dest, linkName) => {
    return (
      <NavLink
        href="#"
        active={isActive === dest}
        onClick={() => {
          this.handlePage(dest);
        }}
      >
        {linkName}
      </NavLink>
    );
  };

  handlePage = (dest) => {
    const { history, user } = this.props;
    console.log(history);
    if (dest === this.destPage.userInfo) {
      history.push({ pathname: `/user/${user.name}` });
    } else {
      history.push({ pathname: `/${dest}` });
    }
  };

  handleSignOut = () => {
    const { dispatch, history } = this.props;
    dispatch(AuthAction.signOut()).then(async () => {
      history.push({ pathname: '/' });
    });
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
                {this.getNavLink(isActive, this.destPage.funding, 'Funding')}
              </NavItem>
              <NavItem>
                {this.getNavLink(isActive, this.destPage.favorite, 'Favorite')}
              </NavItem>
              <NavItem>
                {this.getNavLink(isActive, this.destPage.shop, 'Shop')}
              </NavItem>
            </Nav>
            <Nav className="ml-auto mr-4" navbar>
              <Search history={history} match={match} location={location} />
              <NavItem>
                {this.getNavLink(isActive, this.destPage.cart, shopCart)}
              </NavItem>
              <NavItem>
                {this.getNavLink(isActive, this.destPage.userInfo, person)}
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
