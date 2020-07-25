import React, { Component } from 'react';

import NavBar from 'Components/Main/NavBar';

const defaultProps = {};
const propTypes = {};

class FavoritePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <NavBar isActive="favorite" />
        This is FavoritePage
      </>
    );
  }
}

FavoritePage.defaultProps = defaultProps;
FavoritePage.propTypes = propTypes;

export default FavoritePage;
