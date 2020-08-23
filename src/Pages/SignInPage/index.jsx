import React, { Component } from 'react';

import NavBar from 'Components/Common/NavBar';
import SignInForm from 'Components/Sign/SignInForm';
import SignFacebook from 'Components/Sign/Facebook';
import SignGoogle from 'Components/Sign/Google';

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
                <SignFacebook />
                <SignGoogle />
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
