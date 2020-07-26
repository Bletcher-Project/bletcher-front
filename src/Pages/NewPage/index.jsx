import React, { Component } from 'react';

import NavBar from 'Components/Main/NavBar';

const defaultProps = {};
const propTypes = {};

class NewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <NavBar isActive="new" />
        This is NewPage
      </>
    );
  }
}

NewPage.defaultProps = defaultProps;
NewPage.propTypes = propTypes;

export default NewPage;
