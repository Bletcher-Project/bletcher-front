import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import NavBar from 'Components/Common/NavBar';
import Jumbotron from 'Components/Common/Jumbotron';
import ProgressBar from 'Components/Common/ProgressBar';

const defaultProps = {
  isMixing: false,
};
const propTypes = {
  isMixing: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isMixing: state.postReducer.mixState.isMixing,
  };
};

function ShopPage(props) {
  const { isMixing } = props;
  return (
    <>
      <NavBar isActive="shop" />
      <Jumbotron title="Bletcher Shop" />
      <div className="shopPage">
        <ProgressBar width={50} height={3} barSize={0.8} value={0} mode="mix" />
      </div>
    </>
  );
}

ShopPage.defaultProps = defaultProps;
ShopPage.propTypes = propTypes;

export default connect(mapStateToProps)(ShopPage);
