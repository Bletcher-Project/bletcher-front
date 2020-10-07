import React from 'react';

import NavBar from 'Components/Common/NavBar';
import Jumbotron from 'Components/Common/Jumbotron';

const defaultProps = {};
const propTypes = {};

function ShopPage() {
  return (
    <>
      <NavBar isActive="shop" />
      <Jumbotron title="Bletcher Shop" />
    </>
  );
}

ShopPage.defaultProps = defaultProps;
ShopPage.propTypes = propTypes;

export default ShopPage;
