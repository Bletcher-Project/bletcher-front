import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import { Nav, Navbar, NavItem, NavLink, NavbarBrand } from 'reactstrap';

import { connect } from 'react-redux';
import * as AuthAction from 'Redux/auth';
import cx from 'classnames';

import Logo from 'Components/Common/Logo';
import { person, shopCart } from 'Components/Icon';
import Search from 'Components/Search';

import {
  TO_FUNDING,
  TO_FAVORITE,
  TO_SHOP,
  TO_CART,
  TO_USERINFO,
  TO_NEW,
  TO_SIGNUP,
  TO_SIGNIN,
} from 'Constants/page-for-route';
import { MAC13 } from 'Constants/window-size';
import DropDown from '../DropDown';

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
  constructor(props) {
    super(props);
    this.state = {
      isFold: window.innerWidth < MAC13.width,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    if (window.innerWidth < MAC13.width) {
      this.setState({ isFold: true });
    } else {
      this.setState({ isFold: false });
    }
  };

  getNavLink = (dest, linkName) => {
    const isActive = this.props;
    return (
      <NavLink
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
    if (dest === TO_USERINFO) {
      if (user) history.push({ pathname: `/user/${user.name}` });
      else history.push({ pathname: `/USER_NOT_DEFINED` });
    } else if (!dest) {
      this.handleSignOut();
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

  getActiveNav = () => {
    const { history, location, match, isActive } = this.props;
    switch (isActive) {
      case 'main':
        return <NavItem>{this.getNavLink(TO_SIGNUP, 'Sign Up')}</NavItem>;
      case 'signUp':
        return <NavItem>{this.getNavLink(TO_SIGNIN, 'Sign In')}</NavItem>;
      default:
        return (
          <>
            <NavItem className="leftTab">
              {this.getNavLink(TO_NEW, 'New')}
            </NavItem>
            <NavItem className="leftTab">
              {this.getNavLink(TO_FUNDING, 'Funding')}
            </NavItem>
            <NavItem className="leftTab">
              {this.getNavLink(TO_FAVORITE, 'Favorite')}
            </NavItem>
            <NavItem className="searchTab">
              <Search history={history} match={match} location={location} />
            </NavItem>
            <NavItem>{this.getNavLink(TO_SHOP, 'Shop')}</NavItem>
            <NavItem>{this.getNavLink(TO_CART, shopCart)}</NavItem>
            <NavItem>{this.getNavLink(TO_USERINFO, person)}</NavItem>
            <NavItem>{this.getNavLink('', 'Bye')}</NavItem>
          </>
        );
    }
  };

  render() {
    const { isActive } = this.props;
    const { isFold } = this.state;
    return (
      <>
        <Navbar
          className={cx('navBar', { navBar__primary: isActive !== 'main' })}
          light
          fixed="true"
          expand="md"
        >
          <NavbarBrand className="navBar__logo col-2" href="/">
            <Logo isActive={isActive} />
          </NavbarBrand>
          <Nav
            className={cx('customNav', {
              customNav__main: isActive !== 'main' && isActive !== 'signUp',
            })}
            navbar
          >
            {!isFold ? (
              this.getActiveNav()
            ) : (
              <DropDown
                handlePage={this.handlePage}
                handleSignOut={this.handleSignOut}
              />
            )}
          </Nav>
        </Navbar>
      </>
    );
  }
}

NavBar.defaultProps = defaultProps;
NavBar.propTypes = propTypes;

export default withRouter(connect(mapStateToProps)(NavBar));
