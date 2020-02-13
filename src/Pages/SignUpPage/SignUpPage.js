import React, { Component } from "react";
import { connect } from "react-redux";
import * as AuthAction from "../../Redux/Actions/AuthAction";
import { NavBar, SignUpStepper } from "../../Components";

import CircularProgress from "@material-ui/core/CircularProgress";

import { SignUpType, SignUpInfo, SignUpProfile, SignUpSuccess } from "../";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return { SignUpStep: state.signupReducer.SignUpStep };
};

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;
    const { SignUpStep } = this.props;

    return (
      <div className="signupPage">
        <NavBar isActive="SignUp" />
        {SignUpStep === "typePage" ? (
          <SignUpStepper className="signupPage__step" step={SignUpStep} />
        ) : SignUpStep === "infoPage" ? (
          <SignUpStepper className="signupPage__step" step={SignUpStep} />
        ) : SignUpStep === "profilePage" ? (
          <SignUpStepper className="signupPage__step" step={SignUpStep} />
        ) : null}

        {SignUpStep === "typePage" ? (
          <SignUpType />
        ) : SignUpStep === "infoPage" ? (
          <SignUpInfo />
        ) : SignUpStep === "profilePage" ? (
          <SignUpProfile />
        ) : SignUpStep === "successPage" ? (
          <SignUpSuccess />
        ) : SignUpStep === "loadingPage" ? (
          <div className="signupPage__info">
            <CircularProgress className="signupPage__info-loading" size={200} disableShrink />
          </div>
        ) : null}
      </div>
    );
  }
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default connect(mapStateToProps)(SignUpPage);
