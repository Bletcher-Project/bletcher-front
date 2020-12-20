import React from 'react';

import SignInForm from 'Components/Sign/SignInForm';
import SignFacebook from 'Components/Sign/Facebook';
import SignGoogle from 'Components/Sign/Google';

function SignInContainer() {
  return (
    <div className="signInContainer">
      <div className="signInContainer__form">
        <div className="signInContainer__form-linked">
          <SignFacebook />
          <SignGoogle />
        </div>
        <div className="signInContainer__form-division">
          <hr />
          <span>or</span>
          <hr />
        </div>
        <SignInForm />
      </div>
    </div>
  );
}

export default SignInContainer;
