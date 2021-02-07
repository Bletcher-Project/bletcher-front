import React from 'react';

import CheckBox from 'Components/Form/CheckBox';
import DangerButton from 'Components/Form/DangerButton';

function Account() {
  return (
    <div className="account">
      <p className="account__desc">
        Setting up a login environment can help you provide
        <br />
        customized services. You can change your account here.
      </p>

      <div className="account__login">
        <h3>Login option</h3>
        <p className="account__login-guide">
          Log in to the bletcher using your Facebook or Google account.
          <span>more</span>
        </p>
        <div className="account__login__options">
          <div className="account__login__options-op">
            <CheckBox label="Facebook" />
          </div>
          <div className="account__login__options-op">
            <CheckBox label="Google" />
          </div>
        </div>
      </div>

      <hr />

      <div className="account__change">
        <h3>Account Change</h3>
        <div className="account__change-op">
          <h4>Hide Profile</h4>
          <DangerButton>Account deactivation</DangerButton>
        </div>
        <div className="account__change-op">
          <h4>Deleting accounts and account data</h4>
          <DangerButton secondColor>Account termination</DangerButton>
        </div>
      </div>
    </div>
  );
}

export default Account;
