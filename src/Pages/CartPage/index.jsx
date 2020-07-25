import React, { Component } from 'react';

import NavBar from 'Components/Main/NavBar';

const defaultProps = {};
const propTypes = {};

class cartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <NavBar isActive="cart" />
        This is cartPage
      </>
    );
  }
}

cartPage.defaultProps = defaultProps;
cartPage.propTypes = propTypes;

export default cartPage;
