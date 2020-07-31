import React, { Component } from 'react';

import NavBar from 'Components/Common/NavBar';

const defaultProps = {};
const propTypes = {};

class FundingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <NavBar isActive="funding" />
        This is FundingPage
      </>
    );
  }
}

FundingPage.defaultProps = defaultProps;
FundingPage.propTypes = propTypes;

export default FundingPage;
