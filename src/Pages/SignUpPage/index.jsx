import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';
import * as AuthAction from 'Redux/auth';

import Logo from 'Components/Common/Logo';
import Button from 'Components/Form/Button';
import SignFacebook from 'Components/Sign/Facebook';
import SignGoogle from 'Components/Sign/Google';
import SignUpForm from 'Components/Sign/SignUpForm';

const defaultProps = {
  history: undefined,
};
const propTypes = {
  history: ReactRouterPropTypes.history,
  createUser: PropTypes.func.isRequired,
  signInUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(AuthAction.postUser(user)),
    signInUser: (userInfo) => dispatch(AuthAction.postSignIn(userInfo)),
  };
};

class SignUpPage extends Component {
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

  handleSignUp = async () => {
    const { history, createUser, signInUser } = this.props;
    const { user } = this.state;

    await createUser(user);
    await signInUser({ id: user.email, password: user.password });
    history.push({ pathname: '/' });
  };

  render() {
    const { isValid } = this.state;
    return (
      <div className="signUpPage">
        <div className="signUpPage__header">
          <Logo width={110} />
        </div>
        <div className="signUpPage__container">
          <div className="signUpPage__container__form">
            <div className="signUpPage__container__form-linked">
              <SignFacebook isSignUp />
              <SignGoogle isSignUp />
            </div>
            <div className="signUpPage__container__form-division">
              <hr />
              <span>or</span>
              <hr />
            </div>
            <SignUpForm handleValidation={this.handleValidation} />
            <div className="signUpPage__container__form-policy">
              <hr />
              <p>
                Creating an account means you’re okay with our Terms of Service,
                Privacy Policy, and our default Notification Settings.
              </p>
            </div>
          </div>
          <div className="signUpPage__container__footer">
            <Button
              text="Create account"
              width="250px"
              disabled={!isValid}
              onClick={this.handleSignUp}
            />
            <div className="signUpPage__container__footer-signinlink">
              <span>Already members? </span>
              <a href="/signin">Sign in</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(SignUpPage);
