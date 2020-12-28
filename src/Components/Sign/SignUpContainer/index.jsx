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
  createUser: PropTypes.func.isRequired,
  signInUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(AuthAction.postUser(user)),
    signInUser: (userInfo) => dispatch(AuthAction.postSignIn(userInfo)),
  };
};

class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isValid: false,
      loading: false,
    };
  }

  handleValidation = (user, isValid) => {
    if (isValid) this.setState({ user, isValid: true });
    else this.setState({ isValid: false });
  };

  handleSignUp = async () => {
    const { createUser, signInUser } = this.props;
    const { user } = this.state;

    this.setState({ loading: true });
    await createUser(user);
    await signInUser({ id: user.email, password: user.password });
    this.setState({ loading: false });

    window.location.reload('/');
  };

  render() {
    const { isValid, loading } = this.state;
    return (
      <div className="signUpContainer">
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
          <SignUpForm handleValidation={this.handleValidation} />
          <div className="signUpContainer__form-policy">
            <hr />
            <p>
              Creating an account means you’re okay with our Terms of Service,
              Privacy Policy, and our default Notification Settings.
            </p>
          </div>
        </div>
        <div className="signUpContainer__footer">
          <Button
            text="Create account"
            width="250px"
            disabled={!isValid}
            onClick={this.handleSignUp}
          />
          <div className="signUpContainer__footer-signinlink">
            <span>Already members? </span>
            <a href="/signin">Sign in</a>
          </div>
        </div>
        {loading ? <RoundLoader /> : null}
      </div>
    );
  }
}

SignUpContainer.defaultProps = defaultProps;
SignUpContainer.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(withRouter(SignUpContainer));
