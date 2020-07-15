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
      user: {},
      isNotValid: true,
    };
  }

  handleValidation = (user, isValid) => {
    if (isValid) this.setState({ user, isNotValid: false });
    else this.setState({ isNotValid: true });
  };

  handleSignUp = () => {
    const { user } = this.state;
    console.log(user);
  };

  render() {
    const { isNotValid } = this.state;
    return (
      <div className="signUpPage">
        <NavBar isActive="signUp" />
        <div className="signUpPage__header">
          <p>Enter your personal information.</p>
        </div>
        <div className="signUpPage__content">
          <SignUpForm handleValidation={this.handleValidation} />
        </div>
        <div className="signUpPage__footer">
          <Button
            text="Sign Up"
            disabled={isNotValid}
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
