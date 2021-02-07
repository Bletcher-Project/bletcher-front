import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import {
  Nav,
  Navbar,
  NavItem,
  NavLink,
  NavbarBrand,
  Collapse,
  NavbarToggler,
} from 'reactstrap';
import Logo from 'Components/Common/Logo';
import Search from 'Components/Search';
import person from 'Assets/icons/person';
import shopCart from 'Assets/icons/shopCart';
import logoPoint from 'Assets/logo/logo-point.png';
import NAV_LINK_NAME from 'Constants/link-name';
import cx from 'classnames';

const defaultProps = {
  user: null,
};
const propTypes = {
  isActive: PropTypes.string.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
  }),
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

  componentDidMount() {
    setInterval(() => {
      const { isOpen } = this.state;
      if (isOpen) this.setState({ isOpen: false });
    }, 8000);
  }

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handlePage = (dest) => {
    const { history, user } = this.props;
    if (dest === 'user') {
      if (user) history.push({ pathname: `/user/${user.nickname}` });
      else history.push({ pathname: `/signin` });
    } else {
      history.push({ pathname: `/${dest}` });
    }
  };

  getNavLink = (linkInfo) => {
    const { isActive } = this.props;
    switch (linkInfo.linkName) {
      case 'Cart':
        return shopCart;
      case 'User':
        return person;
      default:
        return (
          <>
            {linkInfo.linkName}
            <img
              className={cx(
                'navBar__navItems__item__point',
                isActive === linkInfo.path ? 'active' : 'disactive',
              )}
              src={logoPoint}
              alt="point"
            />
          </>
        );
    }
  };

  render() {
    const { history, match, location, isActive } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <Navbar className="navBar" light expand="md">
          <NavbarBrand
            className="navBar__logo"
            onClick={() => history.push('/')}
          >
            <Logo point={isActive === 'main' || isActive === 'signIn'} />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav
              className={cx('navBar__navItems', { customNav__open: isOpen })}
              navbar
            >
              {NAV_LINK_NAME.map((data) => {
                return (
                  <NavItem key={data.path} id={data.path}>
                    {data.linkName === 'Search' ? (
                      <Search
                        history={history}
                        match={match}
                        location={location}
                      />
                    ) : (
                      <NavLink
                        className="navBar__navItems__item"
                        active={isActive === data.path}
                        onClick={() => {
                          this.handlePage(data.path);
                        }}
                      >
                        {this.getNavLink(data)}
                      </NavLink>
                    )}
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
