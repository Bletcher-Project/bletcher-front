import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
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

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};

const propTypes = {
  handlePage: PropTypes.func.isRequired,
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
    const { user } = this.props;
    return (
      <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret />
        <DropdownMenu right>
          {this.getDropDownItem(TO_NEW, 'New')}
          {this.getDropDownItem(TO_FUNDING, 'Funding')}
          {this.getDropDownItem(TO_FAVORITE, 'Favorite')}
          <DropdownItem divider />
          <DropdownItem>Search</DropdownItem>
          {this.getDropDownItem(TO_SHOP, 'Shop')}
          {this.getDropDownItem(TO_CART, 'Cart')}
          {this.getDropDownItem(TO_USERINFO, 'My Page')}
          <DropdownItem divider />
          {user
            ? this.getDropDownItem('', 'Sign Out')
            : this.getDropDownItem(TO_SIGNIN, 'Sign In')}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

DropDown.propTypes = propTypes;

export default connect(mapStateToProps)(DropDown);
