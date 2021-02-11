import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RoundInput from 'Components/Form/RoundInput';
import CheckIcon from 'Components/Form/CheckIcon';
import { DEFAULT_HELPER_TEXT } from 'Constants/helper-text';
import {
  checkEmailValidation,
  checkNameValidation,
  checkPasswordValidation,
} from 'Utils/validation';

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

  handleEmail = async (e) => {
    const { user, isValid, helperText } = this.state;
    this.setState({
      user: {
        ...user,
        email: e.target.value,
      },
    });
    const result = await checkEmailValidation(e.target.value);
    this.setState({
      isValid: { ...isValid, email: result.isValid },
      helperText: { ...helperText, email: result.helperText },
    });
  };

  handleName = async (e) => {
    const { user, isValid, helperText } = this.state;
    this.setState({
      user: {
        ...user,
        name: e.target.value,
      },
    });
    const result = await checkNameValidation(e.target.value);
    this.setState({
      isValid: { ...isValid, name: result.isValid },
      helperText: { ...helperText, name: result.helperText },
    });
  };

  handlePassword = (e) => {
    const { user, isValid, helperText } = this.state;
    this.setState({
      user: {
        ...user,
        password: e.target.value,
      },
    });
    const result = checkPasswordValidation(e.target.value);
    this.setState({
      isValid: { ...isValid, password: result.isValid },
      helperText: { ...helperText, password: result.helperText },
    });
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
