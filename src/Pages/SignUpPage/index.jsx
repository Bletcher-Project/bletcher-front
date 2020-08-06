import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import Logo from 'Components/Common/Logo';
import Button from 'Components/Form/Button';
import SignUpFacebook from 'Components/SignUp/SignUpFacebook';
import SignUpGoogle from 'Components/SignUp/SignUpGoogle';
import SignUpForm from 'Components/SignUp/SignUpForm';

import { INIT, USER_API } from 'Constants/api-uri';

const defaultProps = {};
const propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
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
    const { user } = this.state;
    const userData = new FormData();
    userData.append('email', user.email);
    userData.append('name', user.name);
    userData.append('password', user.password);

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}${INIT}${USER_API}`,
      {
        method: 'POST',
        body: userData,
      },
    );

    if (response.status === 200) {
      const { history } = this.props;
      history.push({ pathname: '/signin' });
    }
    // else {
    //   // TODO(seogeurim) : Create Sign Up Failed Page
    //   // console.log(response);
    // }
  };

  render() {
    const { isValid } = this.state;
    return (
      <div className="signUpPage">
        <div className="signUpPage__header">
          <Logo width="130px" />
        </div>
        <div className="signUpPage__container">
          <div className="signUpPage__container__form">
            <div className="signUpPage__container__form-linked">
              <SignUpFacebook />
              <SignUpGoogle />
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

export default SignUpPage;
