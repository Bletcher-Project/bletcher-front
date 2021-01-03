import React from 'react';
import { useSelector } from 'react-redux';

import NavBar from 'Components/Common/NavBar';
import SignInContainer from 'Components/Sign/SignInContainer';
import RoundLoader from 'Components/Loader/Round';

function SignInPage() {
  const authLoading = useSelector((state) => state.authReducer.loading);

  return (
    <>
      <NavBar isActive="signIn" />
      <div className="signInPage">
        <div className="signInPage__header">
          <p>Welcome to Bletcher</p>
        </div>
        <SignInContainer />
        <div className="signInPage__footer">
          <span>Already have an account? </span>
          <a href="/signup">Sign Up</a>
        </div>
      </div>
      {authLoading && <RoundLoader />}
    </>
  );
}

export default SignInPage;
