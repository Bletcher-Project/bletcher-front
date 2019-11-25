import React, { Component } from "react";
import { NavBar } from "../../Components";

const defaultProps = {};
const propTypes = {};

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <NavBar isActive="SignUp" />
      </div>
    );
  }
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default SignUpPage;
