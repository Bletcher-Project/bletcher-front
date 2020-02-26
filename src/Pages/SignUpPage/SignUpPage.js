import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, SignUpStepper } from "../../Components";

import CircularProgress from "@material-ui/core/CircularProgress";

import { SignUpType, SignUpInfo, SignUpProfile, SignUpSuccess } from "../";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return { signUpStep: state.UserReducer.signUpStep };
};

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;
    const { signUpStep } = this.props;

    return (
      <div className="signupPage">
        <NavBar isActive="SignUp" />
        {signUpStep === "typePage" ? (
          <SignUpStepper className="signupPage__step" step={signUpStep} />
        ) : signUpStep === "infoPage" ? (
          <SignUpStepper className="signupPage__step" step={signUpStep} />
        ) : signUpStep === "profilePage" ? (
          <SignUpStepper className="signupPage__step" step={signUpStep} />
        ) : null}

        {signUpStep === "typePage" ? (
          <SignUpType />
        ) : signUpStep === "infoPage" ? (
          <SignUpInfo />
        ) : signUpStep === "profilePage" ? (
          <SignUpProfile />
        ) : signUpStep === "successPage" ? (
          <SignUpSuccess />
        ) : null}
      </div>
    );
  }
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default connect(mapStateToProps)(SignUpPage);
