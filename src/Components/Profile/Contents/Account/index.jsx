import React from 'react';

import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { signOut } from 'Redux/auth';

import CheckBox from 'Components/Form/CheckBox';
import DangerButton from 'Components/Form/DangerButton';

const propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

function Account({ history }) {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
    history.push({ pathname: '/' });
  };

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
          <h4>Sign Out Account</h4>
          <DangerButton onClick={() => handleSignOut()}>Logout</DangerButton>
        </div>
        <div className="account__change-op">
          <h4>Hide Profile</h4>
          <DangerButton disabled>Account deactivation</DangerButton>
        </div>
        <div className="account__change-op">
          <h4>Deleting accounts and account data</h4>
          <DangerButton secondColor>Account termination</DangerButton>
        </div>
      </div>
    </div>
  );
}

Account.propTypes = propTypes;

export default withRouter(Account);
