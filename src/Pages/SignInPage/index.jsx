import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as AuthAction from 'Redux/auth';

import Input from 'Components/Common/Input';
import Button from 'Components/Common/Button';

const defaultProps = {};
const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = () => {
  return {
    isLogin: '',
  };
};

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isIdValid: true,
      isPwValid: true,
      idErrMsg: ' ',
      pwErrMsg: ' ',
      id: '',
      password: '',
    };
  }

  handleId = (e) => {
    this.setState({ id: e.target.value, isIdValid: true, idErrMsg: ' ' });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value, isPwValid: true, pwErrMsg: ' ' });
  };

  handleEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleSignIn();
    }
  };

  handleSignIn = () => {
    const { dispatch } = this.props;
    const { id, password } = this.state;
    if (id === '' && password === '') {
      this.setState({
        isIdValid: false,
        idErrMsg: 'Fill this field.',
        isPwValid: false,
        pwErrMsg: 'Fill this field.',
      });
    } else if (id === '') {
      this.setState({ isIdValid: false, idErrMsg: 'Fill this field.' });
    } else if (password === '') {
      this.setState({ isPwValid: false, pwErrMsg: 'Fill this field.' });
    } else {
      const params = { id, password };
      dispatch(AuthAction.postSignIn(params)).then(async (result) => {
        if (result === 'Login failed! Check authentication credentials') {
          this.setState({
            isIdValid: false,
            idErrMsg: 'Please check your account again.',
            isPwValid: false,
            pwErrMsg: 'Please check your account again.',
          });
        } else {
          await dispatch(AuthAction.getUser(result));
        }
      });
    }
  };

  render() {
    const { isIdValid, idErrMsg, isPwValid, pwErrMsg } = this.state;
    return (
      <div className="signInPage">
        <div className="signInPage__header">
          <p>Bletcher에 로그인 해라</p>
        </div>
        <div className="signInPage__content">
          {/* TODO(Seogeurim) : create Sign In Form Component */}
          <form>
            <Input
              label="Id"
              type="text"
              autoComplete="username"
              width="250px"
              error={!isIdValid}
              helperText={idErrMsg}
              onChange={(e) => this.handleId(e)}
              onKeyPress={this.handleEnter}
            />
            <Input
              label="Password"
              type="password"
              autoComplete="new-password"
              width="250px"
              error={!isPwValid}
              helperText={pwErrMsg}
              onChange={(e) => this.handlePassword(e)}
              onKeyPress={this.handleEnter}
            />
          </form>
        </div>
        <div className="signInPage__footer">
          <Button text="Sign In" onClick={this.handleSignIn} />
          <div className="signInPage__footer__signUpLink">
            <a href="/signup">아직도 회원가입 안 했어요?</a>
          </div>
        </div>
      </div>
    );
  }
}

SignInPage.defaultProps = defaultProps;
SignInPage.propTypes = propTypes;

export default connect(mapStateToProps)(SignInPage);
