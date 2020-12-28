import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RoundInput from 'Components/Form/RoundInput';
import CheckIcon from 'Components/Form/CheckIcon';

import {
  DEFAULT_HELPER_TEXT,
  EmailHelperText,
  PasswordHelperText,
  NameHelperText,
} from 'Constants/helper-text';
import { INIT, USER_API, QUERY_EMAIL, QUERY_NAME } from 'Constants/api-uri';

const propTypes = {
  handleValidation: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        name: '',
        password: '',
      },
      isValid: {
        email: null,
        name: null,
        password: null,
      },
      helperText: {
        email: DEFAULT_HELPER_TEXT,
        name: DEFAULT_HELPER_TEXT,
        password: DEFAULT_HELPER_TEXT,
      },
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { handleValidation } = this.props;
    const { user, isValid } = this.state;
    if (isValid !== prevState.isValid) {
      if (isValid.email && isValid.name && isValid.password)
        handleValidation(user, true);
      else handleValidation(null, false);
    }
  };

  handleEmail = (e) => {
    const { user, isValid, helperText } = this.state;
    this.setState(
      {
        user: {
          ...user,
          email: e.target.value,
        },
      },
      async () => {
        const result = await this.checkEmailValidation();
        this.setState({
          isValid: { ...isValid, email: result.isValid },
          helperText: { ...helperText, email: result.helperText },
        });
      },
    );
  };

  handleName = (e) => {
    const { user, isValid, helperText } = this.state;
    this.setState(
      {
        user: {
          ...user,
          name: e.target.value,
        },
      },
      async () => {
        const result = await this.checkNameValidation();
        this.setState({
          isValid: { ...isValid, name: result.isValid },
          helperText: { ...helperText, name: result.helperText },
        });
      },
    );
  };

  handlePassword = (e) => {
    const { user, isValid, helperText } = this.state;
    this.setState(
      {
        user: {
          ...user,
          password: e.target.value,
        },
      },
      () => {
        const result = this.checkPasswordValidation();
        this.setState({
          isValid: { ...isValid, password: result.isValid },
          helperText: { ...helperText, password: result.helperText },
        });
      },
    );
  };

  checkEmailValidation = async () => {
    const { user } = this.state;
    const regExp = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    let isValid;
    let helperText;

    if (!user.email) {
      isValid = false;
      helperText = EmailHelperText.EMPTY_VALUE;
    } else if (!regExp.test(user.email)) {
      isValid = false;
      helperText = EmailHelperText.NOT_VALID;
    } else {
      const result = await this.checkEmailExists();
      if (result) {
        isValid = false;
        helperText = EmailHelperText.EXIST_VALUE;
      } else {
        isValid = true;
        helperText = DEFAULT_HELPER_TEXT;
      }
    }

    return { isValid, helperText };
  };

  checkEmailExists = async () => {
    const { user } = this.state;
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}${INIT}${USER_API}${QUERY_EMAIL}${user.email}`,
      { method: 'GET' },
    );
    if (response.status === 204) {
      return false;
    }
    return true;
  };

  checkNameValidation = async () => {
    const { user } = this.state;
    const regExp = /^[A-Za-z0-9_.]{3,30}$/;
    const nonAlphabet = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]$/;
    const isSpecial = /\W/;
    const allowSpecial = /[_.]$/;
    let isValid;
    let helperText;

    if (!user.name) {
      isValid = false;
      helperText = NameHelperText.EMPTY_VALUE;
    } else if (!regExp.test(user.name)) {
      isValid = false;
      if (nonAlphabet.test(user.name)) {
        helperText = NameHelperText.ONLY_ALPHABET;
      } else if (isSpecial.test(user.name) && !allowSpecial.test(user.name)) {
        helperText = NameHelperText.NO_SPECIAL_CHAR;
      } else if (user.name.length < 3) {
        helperText = NameHelperText.MIN_WORDS;
      } else if (user.name.length > 30) {
        helperText = NameHelperText.MAX_WORDS;
      }
    } else {
      const result = await this.checkNameExists();
      if (result) {
        isValid = false;
        helperText = NameHelperText.EXIST_VALUE;
      } else {
        isValid = true;
        helperText = DEFAULT_HELPER_TEXT;
      }
    }

    return { isValid, helperText };
  };

  checkNameExists = async () => {
    const { user } = this.state;
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}${INIT}${USER_API}${QUERY_NAME}${user.name}`,
      { method: 'GET' },
    );
    if (response.status === 204) {
      return false;
    }
    return true;
  };

  checkPasswordValidation = () => {
    const { user } = this.state;
    const regExp = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,16}$/;
    const isNum = /^(?=.*[0-9])/;
    const isChar = /^(?=.*[a-zA-Z])/;
    let isValid;
    let helperText;

    if (!user.password) {
      isValid = false;
      helperText = PasswordHelperText.EMPTY_VALUE;
    } else if (!regExp.test(user.password)) {
      isValid = false;
      if (!isNum.test(user.password)) {
        helperText = PasswordHelperText.MISS_NUMBER;
      } else if (!isChar.test(user.password)) {
        helperText = PasswordHelperText.MISS_ALPHABET;
      } else if (user.password.length < 8) {
        helperText = PasswordHelperText.MIN_WORDS;
      } else if (user.password.length > 16) {
        helperText = PasswordHelperText.MAX_WORDS;
      }
    } else {
      isValid = true;
      helperText = DEFAULT_HELPER_TEXT;
    }

    return { isValid, helperText };
  };

  render() {
    const { handleEnter } = this.props;
    const { isValid, helperText } = this.state;

    return (
      <>
        <form className="signUpForm">
          <div className="signUpForm__input">
            <RoundInput
              placeholder="Email"
              type="text"
              width="100%"
              error={isValid.email === false}
              helperText={helperText.email}
              InputProps={isValid.email ? <CheckIcon /> : null}
              onChange={(e) => this.handleEmail(e)}
              onKeyPress={(e) => handleEnter(e)}
            />
          </div>
          <div className="signUpForm__input">
            <RoundInput
              placeholder="Name"
              type="text"
              autoComplete="username"
              width="100%"
              error={isValid.name === false}
              helperText={helperText.name}
              InputProps={isValid.name ? <CheckIcon /> : null}
              onChange={(e) => this.handleName(e)}
              onKeyPress={(e) => handleEnter(e)}
            />
          </div>
          <div className="signUpForm__input">
            <RoundInput
              placeholder="Password"
              type="password"
              autoComplete="new-password"
              width="100%"
              error={isValid.password === false}
              helperText={helperText.password}
              InputProps={isValid.password ? <CheckIcon /> : null}
              onChange={(e) => this.handlePassword(e)}
              onKeyPress={(e) => handleEnter(e)}
            />
          </div>
        </form>
      </>
    );
  }
}

SignUpForm.propTypes = propTypes;

export default SignUpForm;
