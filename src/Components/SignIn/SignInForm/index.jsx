import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RoundInput from 'Components/Form/RoundInput';

const propTypes = {
  handleSignIn: PropTypes.func.isRequired,
};

class SignInForm extends Component {
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
    const { handleSignIn } = this.props;
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  // handleSignIn = () => {
  //   const { dispatch } = this.props;
  //   const { id, password } = this.state;
  //   if (id === '' && password === '') {
  //     this.setState({
  //       isIdValid: false,
  //       idErrMsg: 'Fill this field.',
  //       isPwValid: false,
  //       pwErrMsg: 'Fill this field.',
  //     });
  //   } else if (id === '') {
  //     this.setState({ isIdValid: false, idErrMsg: 'Fill this field.' });
  //   } else if (password === '') {
  //     this.setState({ isPwValid: false, pwErrMsg: 'Fill this field.' });
  //   } else {
  //     const params = { id, password };
  //     dispatch(AuthAction.postSignIn(params)).then(async (token) => {
  //       if (token) {
  //         dispatch(AuthAction.getUser(token));
  //       } else {
  //         this.setState({
  //           isIdValid: false,
  //           idErrMsg: 'Please check your account again.',
  //           isPwValid: false,
  //           pwErrMsg: 'Please check your account again.',
  //         });
  //       }
  //     });
  //   }
  // };

  render() {
    const { isIdValid, idErrMsg, isPwValid, pwErrMsg } = this.state;
    return (
      <div className="signInPage__content">
        <form>
          <RoundInput
            placeholder="Email / Name"
            type="text"
            autoComplete="username"
            width="100%"
            error={!isIdValid}
            helperText={idErrMsg}
            onChange={(e) => this.handleId(e)}
            onKeyPress={this.handleEnter}
          />
          <RoundInput
            placeholder="Password"
            type="password"
            autoComplete="new-password"
            width="100%"
            error={!isPwValid}
            helperText={pwErrMsg}
            onChange={(e) => this.handlePassword(e)}
            onKeyPress={this.handleEnter}
          />
        </form>
      </div>
    );
  }
}

SignInForm.propTypes = propTypes;

export default SignInForm;
