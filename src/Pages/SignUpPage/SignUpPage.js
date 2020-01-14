import React, { Component } from "react";
import { NavBar } from "../../Components";

import { SignUpType, SignUpInfo, SignUpProfile, SignUpSuccess } from "../";

const defaultProps = {};
const propTypes = {};

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Activestep: 0
    };
  }

  render() {
    const { Activestep } = this.state;

    return (
      <div className="signupPage">
        <NavBar isActive="SignUp" />
        <SignUpType />
        {/* <SignUpInfo /> */}
        {/* <SignUpProfile /> */}
        {/* <SignUpSuccess /> */}
      </div>
    );
  }
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default SignUpPage;
