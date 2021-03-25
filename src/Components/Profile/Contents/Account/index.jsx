import React, { useState } from 'react';

import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { signOut, deleteUser, setLoadingState } from 'Redux/auth';

import CheckBox from 'Components/Form/CheckBox';
import DangerButton from 'Components/Form/DangerButton';
import ConfirmModal from 'Components/Profile/ConfirmModal';

const propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

function Account({ history }) {
  const [modal, setModal] = useState({
    active: false,
    goal: '',
    event: null,
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);

  const handleSignOut = () => {
    dispatch(signOut());
    history.push({ pathname: '/' });
  };

  const handleDeleteAccount = async () => {
    dispatch(setLoadingState(true));
    await dispatch(deleteUser(user.id));
    dispatch(setLoadingState(false));
    history.push({ pathname: '/' });
  };

  const openSignOutModal = () => {
    setModal({ active: true, goal: 'log out', event: handleSignOut });
  };

  const openDeleteAccountModal = () => {
    setModal({
      active: true,
      goal: 'delete account',
      event: handleDeleteAccount,
    });
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
          <DangerButton onClick={() => openSignOutModal()}>Logout</DangerButton>
        </div>
        <div className="account__change-op">
          <h4>Hide Profile</h4>
          <DangerButton disabled>Account deactivation</DangerButton>
        </div>
        <div className="account__change-op">
          <h4>Deleting accounts and account data</h4>
          <DangerButton secondColor onClick={() => openDeleteAccountModal()}>
            Account termination
          </DangerButton>
        </div>
      </div>

      <ConfirmModal
        isOpen={modal.active}
        toggle={() => setModal({ ...modal, active: !modal.active })}
        goal={modal.goal}
        handleEvent={modal.event}
      />
    </div>
  );
}

Account.propTypes = propTypes;

export default withRouter(Account);
