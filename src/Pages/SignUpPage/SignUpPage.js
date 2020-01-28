import React, { Component } from "react";
import { connect } from "react-redux";
import * as AuthAction from "../../Redux/Actions/AuthAction";
import { NavBar } from "../../Components";

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
          <SignUpType />
        ) : SignUpStep === "infoPage" ? (
          <SignUpInfo />
        ) : SignUpStep === "profilePage" ? (
          <SignUpProfile />
        ) : SignUpStep === "successPage" ? (
          <SignUpSuccess />
        ) : null}
        {/* <SignUpProfile /> */}
      </div>
    );
  }
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default connect(mapStateToProps)(SignUpPage);
