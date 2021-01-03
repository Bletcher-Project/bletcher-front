import React from 'react';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';

import NavBar from 'Components/Common/NavBar';
import Jumbotron from 'Components/Common/Jumbotron';
import ProgressBar from 'Components/Common/ProgressBar';

function ShopPage() {
  const mixState = useSelector((state) => state.postReducer.mixState);
  const { isMixing, mixId } = mixState;
  return (
    <>
      <NavBar isActive="shop" />
      <Jumbotron title="Bletcher Shop" />
      <div className="shopPage">
        {(isMixing || mixId) && (
          <ProgressBar width={50} height={3} barSize={0.8} value={0} />
        )}
      </div>
    </>
  );
}

// ShopPage.defaultProps = defaultProps;
// ShopPage.propTypes = propTypes;

export default ShopPage;
