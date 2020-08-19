import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as AuthAction from 'Redux/auth';

import RoundInput from 'Components/Form/RoundInput';
import Button from 'Components/Form/Button';
import { DEFAULT_HELPER_TEXT, SignInHelperText } from 'Constants/helper-text';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
  };
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: {
        value: '',
        isValid: true,
        helperText: DEFAULT_HELPER_TEXT,
      },
      password: {
        value: '',
        isValid: true,
        helperText: DEFAULT_HELPER_TEXT,
      },
    };
  }

  handleId = (e) => {
    this.setState({
      id: {
        value: e.target.value,
        isValid: true,
        helperText: DEFAULT_HELPER_TEXT,
      },
    });
  };

  handlePassword = (e) => {
    this.setState({
      password: {
        value: e.target.value,
        isValid: true,
        helperText: DEFAULT_HELPER_TEXT,
      },
    });
  };

  handleEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleSignIn();
    }
  };

  handleSignIn = async () => {
    const { dispatch } = this.props;
    const { id, password } = this.state;
    if (id.value === '' || password.value === '') {
      if (id.value === '') {
        this.setState({
          id: {
            ...id,
            isValid: false,
            helperText: SignInHelperText.EMPTY_VALUE,
          },
        });
      }
      if (password.value === '') {
        this.setState({
          password: {
            ...password,
            isValid: false,
            helperText: SignInHelperText.EMPTY_VALUE,
          },
        });
      }
    } else {
      const userData = { id: id.value, password: password.value };
      const token = await dispatch(AuthAction.postSignIn(userData));
      if (token) {
        dispatch(AuthAction.getUser(token));
      } else {
        this.setState({
          id: {
            ...id,
            isValid: false,
            helperText: SignInHelperText.NOT_VALID,
          },
          password: {
            ...password,
            isValid: false,
            helperText: SignInHelperText.NOT_VALID,
          },
        });
      }
    }
  };

  render() {
    const { id, password } = this.state;
    return (
      <form className="signInForm">
        <div className="signInForm__input">
          <RoundInput
            placeholder="Email / Name"
            type="text"
            autoComplete="username"
            width="100%"
            error={!id.isValid}
            helperText={id.helperText}
            onChange={(e) => this.handleId(e)}
            onKeyPress={this.handleEnter}
          />
        </div>
        <div className="signInForm__input">
          <RoundInput
            placeholder="Password"
            type="password"
            autoComplete="new-password"
            width="100%"
            error={!password.isValid}
            helperText={password.helperText}
            onChange={(e) => this.handlePassword(e)}
            onKeyPress={this.handleEnter}
          />
        </div>
        <div className="signInForm__submit">
          <Button
            text="Sign In"
            width="250px"
            onClick={() => this.handleSignIn()}
          />
        </div>
      </form>
    );
  }
}

SignInForm.propTypes = propTypes;

export default connect(mapStateToProps)(SignInForm);
