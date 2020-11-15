import React from 'react';

import NavBar from 'Components/Common/NavBar';
import Jumbotron from 'Components/Common/Jumbotron';
import ProgressBar from 'Components/Common/ProgressBar';

const defaultProps = {};
const propTypes = {};

function ShopPage() {
  return (
    <>
      <NavBar isActive="shop" />
      <Jumbotron title="Bletcher Shop" />
      <div className="shopPage">
        <ProgressBar width={50} height={4} barSize={1} />
      </div>
    </>
  );
}

ShopPage.defaultProps = defaultProps;
ShopPage.propTypes = propTypes;

export default ShopPage;
