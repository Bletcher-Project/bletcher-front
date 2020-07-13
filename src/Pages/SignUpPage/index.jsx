import React, { Component } from 'react';

import NavBar from 'Components/Main/NavBar';
import Button from 'Components/Common/Button';
import SignUpForm from 'Components/SignUp/SignUpForm';

const defaultProps = {};
const propTypes = {};

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
    };
  }

  handleSignUp = () => {
    //
  };

  render() {
    const { isValid } = this.state;
    return (
      <div className="signUpPage">
        <NavBar isActive="signUp" />
        <div className="signUpPage__header">
          <p>Enter your personal information.</p>
        </div>
        <div className="signUpPage__content">
          <SignUpForm />
        </div>
        <div className="signUpPage__footer">
          <Button
            disabled={isValid}
            text="Sign Up"
            onClick={this.handleSignUp}
          />
        </div>
      </div>
    );
  }
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default SignUpPage;
