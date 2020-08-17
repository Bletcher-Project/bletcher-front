import React, { Component } from 'react';

import NavBar from 'Components/Common/NavBar';
import SignInForm from 'Components/SignIn/SignInForm';
import SignUpFacebook from 'Components/SignUp/SignUpFacebook';
import SignUpGoogle from 'Components/SignUp/SignUpGoogle';

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <NavBar isActive="signIn" />
        <div className="signInPage">
          <div className="signInPage__header">
            <p>Welcome to Bletcher</p>
          </div>
          <div className="signInPage__container">
            <div className="signInPage__container__form">
              <div className="signInPage__container__form-linked">
                <SignUpFacebook />
                <SignUpGoogle />
              </div>
              <div className="signInPage__container__form-division">
                <hr />
                <span>or</span>
                <hr />
              </div>
              <SignInForm />
            </div>
          </div>
          <div className="signInPage__footer">
            <span>Already have an account? </span>
            <a href="/signup">Sign Up</a>
          </div>
        </div>
      </>
    );
  }
}

export default SignInPage;
