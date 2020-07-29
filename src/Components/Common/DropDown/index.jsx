import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import PropTypes from 'prop-types';

import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  NavItem,
} from 'reactstrap';

import {
  TO_FUNDING,
  TO_FAVORITE,
  TO_SHOP,
  TO_CART,
  TO_USERINFO,
  TO_NEW,
  TO_SIGNIN,
} from 'Constants/page-for-route';
import Search from 'Components/Search';

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};

const defaultProps = {
  user: null,
};

const propTypes = {
  handlePage: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  user: PropTypes.objectOf(PropTypes.object),
};

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  getDropDownItem = (dest, linkName) => {
    const { handlePage } = this.props;
    return (
      <DropdownItem
        onClick={() => {
          handlePage(dest);
        }}
      >
        {linkName}
      </DropdownItem>
    );
  };

  render() {
    const { dropdownOpen } = this.state;
    const { user, history, match, location } = this.props;
    return (
      <>
        <NavItem className="searchTab__DropDown">
          <Search history={history} match={match} location={location} />
        </NavItem>
        <Dropdown nav isOpen={dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret />
          <DropdownMenu right>
            {this.getDropDownItem(TO_NEW, 'New')}
            {this.getDropDownItem(TO_FUNDING, 'Funding')}
            {this.getDropDownItem(TO_FAVORITE, 'Favorite')}
            <DropdownItem divider />
            {this.getDropDownItem(TO_SHOP, 'Shop')}
            {this.getDropDownItem(TO_CART, 'Cart')}
            {this.getDropDownItem(TO_USERINFO, 'My Page')}
            <DropdownItem divider />
            {user
              ? this.getDropDownItem('', 'Sign Out')
              : this.getDropDownItem(TO_SIGNIN, 'Sign In')}
          </DropdownMenu>
        </Dropdown>
      </>
    );
  }
}

DropDown.propTypes = propTypes;
DropDown.defaultProps = defaultProps;

export default withRouter(connect(mapStateToProps)(DropDown));
