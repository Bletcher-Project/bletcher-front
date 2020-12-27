import React from 'react';

import Logo from 'Components/Common/Logo';
import SignUpContainer from 'Components/Sign/SignUpContainer';

function SignUpPage() {
  return (
    <div className="signUpPage">
      <div className="signUpPage__header">
        <Logo width={110} />
      </div>
      <SignUpContainer />
    </div>
  );
}

export default SignUpPage;
