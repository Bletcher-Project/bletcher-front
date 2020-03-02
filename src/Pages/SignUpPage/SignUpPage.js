import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, SignUpStepper } from "../../Components";

import * as UserAction from "../../Redux/Actions/UserAction";

import { SignUpType, SignUpInfo, SignUpProfile, SignUpSuccess } from "../";

const defaultProps = {};
const propTypes = {};

const mapDispatchToProps = dispatch => {
  return {
    postSignup: params => dispatch(UserAction.postSignup(params))
  };
};

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpStep: "typePage",
      userType: "",
      email: "",
      name: "",
      password: "",
      status: "",
      profileImg: null
    };
  }
  render() {
    console.log(this.state);
    const { signUpStep, userType, name } = this.state;

    return (
      <div className="signupPage">
        <NavBar isActive="signUp" />
        {signUpStep === "typePage" ? (
          <div>
            <SignUpStepper className="signupPage__step" step={signUpStep} />
            <SignUpType
              handleSignUpStep={this.handleSignUpStep}
              handleUserInfo={this.handleUserInfo}
            />
          </div>
        ) : signUpStep === "infoPage" ? (
          <div>
            <SignUpStepper className="signupPage__step" step={signUpStep} />
            <SignUpInfo
              userType={userType}
              handleSignUpStep={this.handleSignUpStep}
              handleUserInfo={this.handleUserInfo}
            />
          </div>
        ) : signUpStep === "profilePage" ? (
          <div>
            <SignUpStepper className="signupPage__step" step={signUpStep} />
            <SignUpProfile
              handleSignUpStep={this.handleSignUpStep}
              handleUserInfo={this.handleUserInfo}
              handleSignUp={this.handleSignUp}
            />
          </div>
        ) : signUpStep === "successPage" ? (
          <SignUpSuccess userType={userType} name={name} />
        ) : null}
      </div>
    );
  }

  handleSignUpStep = step => {
    this.setState({ signUpStep: step });
  };

  handleUserInfo = info => {
    this.setState({
      userType: info.userType ? info.userType : this.state.userType,
      email: info.email ? info.email : this.state.email,
      name: info.name ? info.name : this.state.name,
      password: info.password ? info.password : this.state.password,
      status: info.status ? info.status : this.state.status,
      profileImg: info.profileImg ? info.profileImg : this.state.profileImg
    });
  };

  handleSignUp = async () => {
    const formData = new FormData();
    formData.append("email", this.state.email);
    formData.append("name", this.state.name);
    formData.append("password", this.state.password);
    formData.append("status", this.state.status);
    formData.append("type", this.state.userType === "Sketcher" ? 0 : 1);
    formData.append("img", this.state.profileImg);
    const postSignup = await this.props.postSignup(formData);
    return postSignup ? this.handleSignUpStep("successPage") : null;
  };
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(SignUpPage);
