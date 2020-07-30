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

import { NAV_LINK_NAME } from 'Constants/link-name';

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

  getNavLink = (linkInfo) => {
    const { isActive } = this.props;
    let linkName;
    if (linkInfo.linkName === 'Cart') linkName = shopCart;
    else if (linkInfo.linkName === 'User') linkName = person;
    else linkName = linkInfo.linkName;

    return (
      <NavLink
        active={isActive === linkInfo.path}
        onClick={() => {
          this.handlePage(linkInfo.path);
        }}
      >
        {linkName}
      </NavLink>
    );
  };

  render() {
    const { history, match, location } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <Navbar className="navBar" light fixed="true" expand="md">
          <NavbarBrand className="col-2" href="/">
            <Logo />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav
              className={cx('navBar__navItems', { customNav__open: isOpen })}
              navbar
            >
              {NAV_LINK_NAME.map((data) => {
                if (data === 'Search') {
                  return (
                    <NavItem key={data.path}>
                      <Search
                        history={history}
                        match={match}
                        location={location}
                      />
                    </NavItem>
                  );
                }
                return (
                  <NavItem
                    key={data.path}
                    className={`navBar__navItems__${data.path}`}
                  >
                    {this.getNavLink(data)}
                  </NavItem>
                );
              })}
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
