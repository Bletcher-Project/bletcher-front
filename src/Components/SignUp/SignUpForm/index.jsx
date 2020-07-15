import React, { Component } from 'react';

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
import { INIT, USER_API, QUERY_EMAIL } from 'Constants/api_uri';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImg: null,
      user: {
        email: '',
        password: '',
        repassword: '',
        name: '',
        status: '',
      },
      isNotValid: {
        email: null,
        password: null,
        repassword: null,
        name: null,
        status: false,
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

  handleProfileImg = (e) => {
    if (e.target.files[0] !== undefined) {
      this.setState({ profileImg: e.target.files[0] });
    }
  };

  handleEmail = (e) => {
    const { user, isNotValid, helperText } = this.state;
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
          isNotValid: { ...isNotValid, email: result.isNotValid },
          helperText: { ...helperText, email: result.helperText },
        });
      },
    );
  };

  handlePassword = (e) => {
    const { user, isNotValid, helperText } = this.state;
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
          isNotValid: { ...isNotValid, password: result.isNotValid },
          helperText: { ...helperText, password: result.helperText },
        });
      },
    );
  };

  handleRePassword = (e) => {
    const { user, isNotValid, helperText } = this.state;
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
          isNotValid: { ...isNotValid, repassword: result.isNotValid },
          helperText: { ...helperText, repassword: result.helperText },
        });
      },
    );
  };

  handleName = (e) => {
    const { user, isNotValid, helperText } = this.state;
    this.setState(
      {
        user: {
          ...user,
          name: e.target.value,
        },
      },
      () => {
        const result = this.checkNameValidation();
        this.setState({
          isNotValid: { ...isNotValid, name: result.isNotValid },
          helperText: { ...helperText, name: result.helperText },
        });
      },
    );
  };

  handleStatus = (e) => {
    const { user, isNotValid, helperText } = this.state;
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
          isNotValid: { ...isNotValid, status: result.isNotValid },
          helperText: { ...helperText, status: result.helperText },
        });
      },
    );
  };

  checkEmailValidation = async () => {
    const { user } = this.state;
    const regExp = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    let isNotValid;
    let helperText;

    if (!user.email) {
      isNotValid = true;
      helperText = EmailHelperText.EMPTY_VALUE;
    } else if (!regExp.test(user.email)) {
      isNotValid = true;
      helperText = EmailHelperText.NOT_VALID;
    } else {
      const result = await this.checkEmailExists();
      if (result) {
        isNotValid = true;
        helperText = EmailHelperText.EXIST_VALUE;
      } else {
        isNotValid = false;
        helperText = EmailHelperText.DEFAULT_HELPER_TEXT;
      }
    }

    return { isNotValid, helperText };
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
    let isNotValid;
    let helperText;

    if (!user.password) {
      isNotValid = true;
      helperText = PasswordHelperText.EMPTY_VALUE;
    } else if (!regExp.test(user.password)) {
      isNotValid = true;
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
      isNotValid = false;
      helperText = DEFAULT_HELPER_TEXT;
    }

    return { isNotValid, helperText };
  };

  checkRePasswordValidation = () => {
    const { user } = this.state;
    let isNotValid;
    let helperText;

    if (!user.repassword) {
      isNotValid = true;
      helperText = PasswordHelperText.EMPTY_VALUE;
    } else if (!Object.is(user.password, user.repassword)) {
      isNotValid = true;
      helperText = PasswordHelperText.MISS_MATCH_PW;
    } else {
      isNotValid = false;
      helperText = DEFAULT_HELPER_TEXT;
    }

    return { isNotValid, helperText };
  };

  checkNameValidation = () => {
    const { user } = this.state;
    const regExp = /^[A-Za-z0-9_.]{3,30}$/;
    const nonAlphabet = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]$/;
    const isSpecial = /\W/;
    const allowSpecial = /[_.]$/;
    let isNotValid;
    let helperText;

    if (!user.name) {
      isNotValid = true;
      helperText = NameHelperText.EMPTY_VALUE;
    } else if (!regExp.test(user.name)) {
      isNotValid = true;
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
      isNotValid = false;
      helperText = DEFAULT_HELPER_TEXT;
    }

    return { isNotValid, helperText };
  };

  checkStatusValidation = () => {
    const { user } = this.state;
    let isNotValid;
    let helperText;

    if (user.status.length > 100) {
      isNotValid = true;
      helperText = StatusHelperText.MAX_WORDS;
    } else {
      isNotValid = false;
      helperText = DEFAULT_HELPER_TEXT;
    }

    return { isNotValid, helperText };
  };

  render() {
    const { profileImg, isNotValid, helperText } = this.state;

    return (
      <>
        <div className="signUpForm__profileImg">
          <UploadImgFile handleUploadImg={this.handleProfileImg}>
            <Avatar
              src={
                profileImg ? URL.createObjectURL(profileImg) : defaultProfile
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
                error={isNotValid.email}
                helperText={helperText.email}
                InputProps={isNotValid.email === false ? <CheckIcon /> : null}
                onChange={(e) => this.handleEmail(e)}
              />
              <Input
                label="Password"
                type="password"
                autoComplete="new-password"
                width="210px"
                error={isNotValid.password}
                helperText={helperText.password}
                InputProps={
                  isNotValid.password === false ? <CheckIcon /> : null
                }
                onChange={(e) => this.handlePassword(e)}
              />
              <Input
                label="Password Confirm"
                type="password"
                autoComplete="new-password"
                width="210px"
                error={isNotValid.repassword}
                helperText={helperText.repassword}
                InputProps={
                  isNotValid.repassword === false ? <CheckIcon /> : null
                }
                onChange={(e) => this.handleRePassword(e)}
              />
            </form>
          </div>
          <div className="signUpForm__userInfo__profile">
            <Input
              label="Name"
              type="text"
              width="210px"
              error={isNotValid.name}
              helperText={helperText.name}
              InputProps={isNotValid.name === false ? <CheckIcon /> : null}
              onChange={(e) => this.handleName(e)}
            />
            <Input
              label="Status (optional)"
              type="text"
              width="210px"
              error={isNotValid.status}
              helperText={helperText.status}
              onChange={(e) => this.handleStatus(e)}
            />
          </div>
        </div>
      </>
    );
  }
}

export default SignUpForm;
