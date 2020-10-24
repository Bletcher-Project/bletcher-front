import React from 'react';

import NavBar from 'Components/Common/NavBar';
import Jumbotron from 'Components/Common/Jumbotron';
import Empty from 'Components/Common/Empty';
import shopEmptyIcon from 'Assets/images/shop-empty.png';

const defaultProps = {};
const propTypes = {};

function ShopPage() {
  return (
    <>
      <NavBar isActive="shop" />
      <Jumbotron title="Bletcher Shop" />
      <Empty>
        <img src={shopEmptyIcon} alt="shop-empty" />
      </Empty>
    </>
  );
}

ShopPage.defaultProps = defaultProps;
ShopPage.propTypes = propTypes;

export default ShopPage;
