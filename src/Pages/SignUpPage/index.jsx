import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import NavBar from 'Components/Main/NavBar';
import Button from 'Components/Common/Button';
import SignUpForm from 'Components/SignUp/SignUpForm';

import { INIT, USER_API } from 'Constants/api_uri';

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
    userData.append('img', user.profileImg);
    userData.append('status', user.status);
    userData.append('type', 1);

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
        <NavBar isActive="signUp" />
        <div className="signUpPage__header">
          <p>Enter your personal information.</p>
        </div>
        <div className="signUpPage__content">
          <SignUpForm handleValidation={this.handleValidation} />
        </div>
        <div className="signUpPage__footer">
          <Button
            text="Sign Up"
            disabled={!isValid}
            onClick={this.handleSignUp}
          />
        </div>
      </div>
    );
  }
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default SignUpPage;
