import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import {
  Nav,
  Navbar,
  NavItem,
  NavLink,
  NavbarBrand,
  Collapse,
  NavbarToggler,
} from 'reactstrap';

import { connect } from 'react-redux';
import * as AuthAction from 'Redux/auth';

import Logo from 'Components/Common/Logo';
import Search from 'Components/Search';
import person from 'Assets/icons/person';
import shopCart from 'Assets/icons/shopCart';
import cx from 'classnames';

import {
  NAV_LINK_NAME,
  SIGNUP_LINK_NAME,
  SIGNIN_LINK_NAME,
} from 'Constants/link-name';

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
      isOpen: false,
    };
  }

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
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

  handleSignOut = () => {
    const { dispatch, history } = this.props;
    dispatch(AuthAction.signOut()).then(async () => {
      history.push({ pathname: '/' });
    });
  };

  handlePage = (dest) => {
    const { history, user } = this.props;
    if (dest === 'user') {
      if (user) history.push({ pathname: `/user/${user.name}` });
      else history.push({ pathname: `/USER_NOT_DEFINED` });
    } else if (dest === 'bye') {
      this.handleSignOut();
    } else {
      history.push({ pathname: `/${dest}` });
    }
  };

  getActiveNav = () => {
    const { history, location, match, isActive } = this.props;
    switch (isActive) {
      case 'main':
        return (
          <NavItem>
            {this.getNavLink(SIGNUP_LINK_NAME.toLowerCase(), SIGNUP_LINK_NAME)}
          </NavItem>
        );
      case 'signUp':
        return (
          <NavItem>
            {this.getNavLink(SIGNIN_LINK_NAME.toLowerCase(), SIGNIN_LINK_NAME)}
          </NavItem>
        );
      default:
        return NAV_LINK_NAME.map((x) => {
          let data = x;
          if (data === 'Search') {
            return (
              <NavItem>
                <Search history={history} match={match} location={location} />
              </NavItem>
            );
          }
          if (data === 'Cart') data = shopCart;
          else if (data === 'User') data = person;
          return (
            <NavItem className={`${x.toLowerCase()}Tab`}>
              {this.getNavLink(x.toLowerCase(), data)}
            </NavItem>
          );
        });
    }
  };

  render() {
    const { isActive } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <Navbar
          className={cx('navBar', { navBar__primary: isActive !== 'main' })}
          light
          fixed="true"
          expand="md"
        >
          <NavbarBrand className="col-2" href="/">
            <Logo isActive={isActive} />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav
              className={cx('customNav', { customNav__open: isOpen })}
              navbar
            >
              {this.getActiveNav()}
            </Nav>
          </Collapse>
        </Navbar>
      </>
    );
  }
}

NavBar.defaultProps = defaultProps;
NavBar.propTypes = propTypes;

export default withRouter(connect(mapStateToProps)(NavBar));
