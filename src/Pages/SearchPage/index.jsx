import React, { Component } from 'react';

import NavBar from 'Components/Main/NavBar';

const defaultProps = {};
const propTypes = {};

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <NavBar isActive="search" />
        {/* <div>{searchWord}</div> */}
        This is Search Page.
      </>
    );
  }
}

SearchPage.defaultProps = defaultProps;
SearchPage.propTypes = propTypes;

export default SearchPage;
