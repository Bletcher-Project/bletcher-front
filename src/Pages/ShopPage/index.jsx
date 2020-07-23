import React, { Component } from 'react';

import NavBar from 'Components/Main/NavBar';

const defaultProps = {};
const propTypes = {};

class GuidePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <NavBar isActive="shop" />;
  }
}

GuidePage.defaultProps = defaultProps;
GuidePage.propTypes = propTypes;

export default GuidePage;
