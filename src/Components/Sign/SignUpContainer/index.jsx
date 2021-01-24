import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import * as AuthAction from 'Redux/auth';

import Button from 'Components/Form/Button';
import SignFacebook from 'Components/Sign/Facebook';
import SignGoogle from 'Components/Sign/Google';
import SignUpForm from 'Components/Sign/SignUpForm';
import RoundLoader from 'Components/Loader/Round';

const defaultProps = {};
const propTypes = {
  authLoading: PropTypes.bool.isRequired,
  createUser: PropTypes.func.isRequired,
  signInUser: PropTypes.func.isRequired,
  setLoadingState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authLoading: state.authReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(AuthAction.postUser(user)),
    signInUser: (userInfo) => dispatch(AuthAction.postSignIn(userInfo)),
    setLoadingState: (loadingState) =>
      dispatch(AuthAction.setLoadingState(loadingState)),
  };
};

class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isValid: false,
    };
  }

  handleValidation = (user, isValid) => {
    if (isValid) this.setState({ user, isValid: true });
    else this.setState({ isValid: false });
  };

  handleEnter = (e) => {
    const { isValid } = this.state;

    if (isValid && e.key === 'Enter') {
      this.handleSignUp();
    }
  };

  handleSignUp = async () => {
    const { createUser, signInUser, setLoadingState } = this.props;
    const { user } = this.state;

    setLoadingState(true);
    await createUser(user);
    await signInUser({ id: user.email, password: user.password });
    setLoadingState(false);

    window.location.reload('/');
  };

  render() {
    const { authLoading } = this.props;
    const { isValid } = this.state;

    return (
      <div className="signUpContainer">
        {authLoading && <RoundLoader />}
        <div className="signUpContainer__form">
          <div className="signUpContainer__form-linked">
            <SignFacebook isSignUp />
            <SignGoogle isSignUp />
          </div>
          <div className="signUpContainer__form-division">
            <hr />
            <span>or</span>
            <hr />
          </div>
          <SignUpForm
            handleValidation={this.handleValidation}
            handleEnter={(e) => this.handleEnter(e)}
          />
          <div className="signUpContainer__form-policy">
            <hr />
            <p>
              Creating an account means you’re okay with our Terms of Service,
              Privacy Policy, and our default Notification Settings.
            </p>
          </div>
        </div>
        <div className="signUpContainer__footer">
          <Button width="250px" disabled={!isValid} onClick={this.handleSignUp}>
            Create account
          </Button>
          <div className="signUpContainer__footer-signinlink">
            <span>Already members? </span>
            <a href="/signin">Sign in</a>
          </div>
        </div>
      </div>
    );
  }
}

SignUpContainer.defaultProps = defaultProps;
SignUpContainer.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SignUpContainer));
