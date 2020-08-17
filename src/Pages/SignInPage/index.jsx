import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as AuthAction from 'Redux/auth';

import NavBar from 'Components/Common/NavBar';
import SignInForm from 'Components/SignIn/SignInForm';
import SignUpFacebook from 'Components/SignUp/SignUpFacebook';
import SignUpGoogle from 'Components/SignUp/SignUpGoogle';
import Button from 'Components/Form/Button';

const defaultProps = {};
const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  };
};

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSignIn = () => {
    const { dispatch } = this.props;
    const { id, password } = this.state;
    if (id === '' || password === '') {
      // TODO(Seogeurim) "fill this field" error message
    } else {
      const params = { id, password };
      dispatch(AuthAction.postSignIn(params)).then(async (token) => {
        if (token) {
          dispatch(AuthAction.getUser(token));
        } else {
          // TODO(Seogeurim) "check your account again" error message
        }
      });
    }
  };

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
                <SignUpFacebook />
                <SignUpGoogle />
              </div>
              <div className="signInPage__container__form-division">
                <hr />
                <span>or</span>
                <hr />
              </div>
              <SignInForm handleSignIn={this.handleSignIn} />
            </div>
            <div className="signInPage__container__footer">
              <Button
                text="Sign In"
                width="250px"
                onClick={this.handleSignIn}
              />
              <div className="signInPage__container__footer-signuplink">
                <span>Already have an account? </span>
                <a href="/signup">Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

SignInPage.defaultProps = defaultProps;
SignInPage.propTypes = propTypes;

export default connect(mapStateToProps)(SignInPage);
