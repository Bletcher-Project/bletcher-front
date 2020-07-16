import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UploadImgFile from 'Components/Upload/UploadImgFile';
import Input from 'Components/Common/Input';
import CheckIcon from 'Components/Common/CheckIcon';

import Avatar from '@material-ui/core/Avatar';
import defaultProfile from 'Assets/images/default_profile.svg';

import {
  DEFAULT_HELPER_TEXT,
  EmailHelperText,
  PasswordHelperText,
  NameHelperText,
  StatusHelperText,
} from 'Constants/helper-text';
import { INIT, USER_API, QUERY_EMAIL, QUERY_NAME } from 'Constants/api_uri';

const propTypes = {
  handleValidation: PropTypes.func.isRequired,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        repassword: '',
        name: '',
        status: '',
        profileImg: null,
      },
      isValid: {
        email: null,
        password: null,
        repassword: null,
        name: null,
        status: true,
      },
      helperText: {
        email: DEFAULT_HELPER_TEXT,
        password: DEFAULT_HELPER_TEXT,
        repassword: DEFAULT_HELPER_TEXT,
        name: DEFAULT_HELPER_TEXT,
        status: DEFAULT_HELPER_TEXT,
      },
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { handleValidation } = this.props;
    const { user, isValid } = this.state;
    if (
      isValid !== prevState.isValid ||
      user.profileImg !== prevState.user.profileImg
    ) {
      if (
        isValid.email &&
        isValid.password &&
        isValid.repassword &&
        isValid.name &&
        isValid.status
      )
        handleValidation(user, true);
      else handleValidation(null, false);
    }
  };

  handleProfileImg = (e) => {
    const { user } = this.state;
    if (e.target.files[0] !== undefined) {
      this.setState({ user: { ...user, profileImg: e.target.files[0] } });
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

  handleRePassword = (e) => {
    const { user, isValid, helperText } = this.state;
    this.setState(
      {
        user: {
          ...user,
          repassword: e.target.value,
        },
      },
      () => {
        const result = this.checkRePasswordValidation();
        this.setState({
          isValid: { ...isValid, repassword: result.isValid },
          helperText: { ...helperText, repassword: result.helperText },
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

  handleStatus = (e) => {
    const { user, isValid, helperText } = this.state;
    this.setState(
      {
        user: {
          ...user,
          status: e.target.value,
        },
      },
      () => {
        const result = this.checkStatusValidation();
        this.setState({
          isValid: { ...isValid, status: result.isValid },
          helperText: { ...helperText, status: result.helperText },
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

  checkRePasswordValidation = () => {
    const { user } = this.state;
    let isValid;
    let helperText;

    if (!user.repassword) {
      isValid = false;
      helperText = PasswordHelperText.EMPTY_VALUE;
    } else if (!Object.is(user.password, user.repassword)) {
      isValid = false;
      helperText = PasswordHelperText.MISS_MATCH_PW;
    } else {
      isValid = true;
      helperText = DEFAULT_HELPER_TEXT;
    }

    return { isValid, helperText };
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

  checkStatusValidation = () => {
    const { user } = this.state;
    let isValid;
    let helperText;

    if (user.status.length > 100) {
      isValid = false;
      helperText = StatusHelperText.MAX_WORDS;
    } else {
      isValid = true;
      helperText = DEFAULT_HELPER_TEXT;
    }

    return { isValid, helperText };
  };

  render() {
    const { user, isValid, helperText } = this.state;

    return (
      <>
        <div className="signUpForm__profileImg">
          <UploadImgFile handleUploadImg={this.handleProfileImg}>
            <Avatar
              src={
                user.profileImg
                  ? URL.createObjectURL(user.profileImg)
                  : defaultProfile
              }
              style={{
                width: '100px',
                height: '100px',
                cursor: 'pointer',
              }}
            />
          </UploadImgFile>
          <UploadImgFile handleUploadImg={this.handleProfileImg}>
            <p>Edit Photo</p>
          </UploadImgFile>
        </div>
        <div className="signUpForm__userInfo">
          <div className="signUpForm__userInfo__account">
            <form>
              <Input
                label="Email"
                type="email"
                autoComplete="username"
                width="210px"
                error={isValid.email === false}
                helperText={helperText.email}
                InputProps={isValid.email ? <CheckIcon /> : null}
                onChange={(e) => this.handleEmail(e)}
              />
              <Input
                label="Password"
                type="password"
                autoComplete="new-password"
                width="210px"
                error={isValid.password === false}
                helperText={helperText.password}
                InputProps={isValid.password ? <CheckIcon /> : null}
                onChange={(e) => this.handlePassword(e)}
              />
              <Input
                label="Password Confirm"
                type="password"
                autoComplete="new-password"
                width="210px"
                error={isValid.repassword === false}
                helperText={helperText.repassword}
                InputProps={isValid.repassword ? <CheckIcon /> : null}
                onChange={(e) => this.handleRePassword(e)}
              />
            </form>
          </div>
          <div className="signUpForm__userInfo__profile">
            <Input
              label="Name"
              type="text"
              width="210px"
              error={isValid.name === false}
              helperText={helperText.name}
              InputProps={isValid.name ? <CheckIcon /> : null}
              onChange={(e) => this.handleName(e)}
            />
            <Input
              label="Status (optional)"
              type="text"
              width="210px"
              error={isValid.status === false}
              helperText={helperText.status}
              onChange={(e) => this.handleStatus(e)}
            />
          </div>
        </div>
      </>
    );
  }
}

SignUpForm.propTypes = propTypes;

export default SignUpForm;
