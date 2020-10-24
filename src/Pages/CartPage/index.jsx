import React, { Component } from 'react';

import NavBar from 'Components/Common/NavBar';
import Empty from 'Components/Common/Empty';
import cartEmptyIcon from 'Assets/images/cart-empty.png';

const defaultProps = {};
const propTypes = {};

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <NavBar isActive="cart" />
        <Empty>
          <img src={cartEmptyIcon} alt="cart-empty" />
        </Empty>
      </>
    );
  }
}

CartPage.defaultProps = defaultProps;
CartPage.propTypes = propTypes;

export default CartPage;
