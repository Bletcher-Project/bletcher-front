import React, { Component } from 'react';

import NavBar from 'Components/Common/NavBar';

const defaultProps = {};
const propTypes = {};

class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <NavBar isActive="shop" />
        This is Shop Page.
      </>
    );
  }
}

ShopPage.defaultProps = defaultProps;
ShopPage.propTypes = propTypes;

export default ShopPage;
