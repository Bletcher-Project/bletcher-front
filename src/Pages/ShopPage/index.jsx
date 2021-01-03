import React from 'react';

import NavBar from 'Components/Common/NavBar';
import Jumbotron from 'Components/Common/Jumbotron';
import MixChecker from 'Components/Mix/MixChecker';

function ShopPage() {
  return (
    <>
      <NavBar isActive="shop" />
      <Jumbotron title="Bletcher Shop" />
      <MixChecker />
      <div className="shopPage" />
    </>
  );
}

export default ShopPage;
