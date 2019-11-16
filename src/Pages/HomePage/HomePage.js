import React, { Component } from "react";

const defaultProps = {};
const propTypes = {};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>This is Home Page</div>;
  }
}

HomePage.defaultProps = defaultProps;
HomePage.propTypes = propTypes;

export default HomePage;
