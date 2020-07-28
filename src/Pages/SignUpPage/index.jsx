import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import Button from 'Components/Form/Button';
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
          <p>너도 해보고 싶니 Bletcher</p>
        </div>
        <div className="signUpPage__content">
          <SignUpForm handleValidation={this.handleValidation} />
        </div>
        <div className="signUpPage__footer">
          <Button
            text="회원가입"
            disabled={!isValid}
            onClick={this.handleSignUp}
          />
          <div className="signUpPage__footer__signInLink">
            <span>이미 아이디가 있으시다면? </span>
            <a href="/signin">로그인 하러 가기</a>
          </div>
        </div>
      </div>
    );
  }
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default SignUpPage;
