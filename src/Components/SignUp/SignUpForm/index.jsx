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
        status: null,
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
    const { user } = this.state;
    this.setState(
      {
        user: {
          ...user,
          email: e.target.value,
        },
      },
      () => this.checkEmailValidation(),
    );
  };

  handlePassword = (e) => {
    const { user } = this.state;
    this.setState(
      {
        user: {
          ...user,
          password: e.target.value,
        },
      },
      () => this.checkPasswordValidation(),
    );
  };

  handleRePassword = (e) => {
    const { user } = this.state;
    this.setState(
      {
        user: {
          ...user,
          repassword: e.target.value,
        },
      },
      () => this.checkRePasswordValidation(),
    );
  };

  handleName = (e) => {
    const { user } = this.state;
    this.setState(
      {
        user: {
          ...user,
          name: e.target.value,
        },
      },
      () => this.checkNameValidation(),
    );
  };

  handleStatus = (e) => {
    const { user } = this.state;
    this.setState(
      {
        user: {
          ...user,
          status: e.target.value,
        },
      },
      () => this.checkStatusValidation(),
    );
  };

  checkEmailValidation = () => {
    const { user, isNotValid, helperText } = this.state;
    const regExp = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!user.email) {
      this.setState({
        isNotValid: { ...isNotValid, email: true },
        helperText: { ...helperText, email: EmailHelperText.EMPTY_VALUE },
      });
    } else if (!regExp.test(user.email)) {
      this.setState({
        isNotValid: { ...isNotValid, email: true },
        helperText: { ...helperText, email: EmailHelperText.NOT_VALID },
      });
    } else {
      this.setState({
        isNotValid: { ...isNotValid, email: false },
        helperText: { ...helperText, email: DEFAULT_HELPER_TEXT },
      });
    }
  };

  checkPasswordValidation = () => {
    const { user, isNotValid, helperText } = this.state;
    const regExp = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,16}$/;
    const isNum = /^(?=.*[0-9])/;
    const isChar = /^(?=.*[a-zA-Z])/;

    if (!user.password) {
      this.setState({
        isNotValid: { ...isNotValid, password: true },
        helperText: { ...helperText, password: PasswordHelperText.EMPTY_VALUE },
      });
    } else if (!regExp.test(user.password)) {
      this.setState({ isNotValid: { ...isNotValid, password: true } });
      if (!isNum.test(user.password)) {
        this.setState({
          helperText: {
            ...helperText,
            password: PasswordHelperText.MISS_NUMBER,
          },
        });
      } else if (!isChar.test(user.password)) {
        this.setState({
          helperText: {
            ...helperText,
            password: PasswordHelperText.MISS_ALPHABET,
          },
        });
      } else if (user.password.length < 8) {
        this.setState({
          helperText: { ...helperText, password: PasswordHelperText.MIN_WORDS },
        });
      } else if (user.password.length > 16) {
        this.setState({
          helperText: { ...helperText, password: PasswordHelperText.MAX_WORDS },
        });
      }
    } else {
      this.setState({
        isNotValid: { ...isNotValid, password: false },
        helperText: { ...helperText, password: DEFAULT_HELPER_TEXT },
      });
    }
  };

  checkRePasswordValidation = () => {
    const { user, isNotValid, helperText } = this.state;

    if (!user.repassword) {
      this.setState({
        isNotValid: { ...isNotValid, repassword: true },
        helperText: {
          ...helperText,
          repassword: PasswordHelperText.EMPTY_VALUE,
        },
      });
    } else if (!Object.is(user.password, user.repassword)) {
      this.setState({
        isNotValid: { ...isNotValid, repassword: true },
        helperText: {
          ...helperText,
          repassword: PasswordHelperText.MISS_MATCH_PW,
        },
      });
    } else {
      this.setState({
        isNotValid: { ...isNotValid, repassword: false },
        helperText: { ...helperText, repassword: DEFAULT_HELPER_TEXT },
      });
    }
  };

  checkNameValidation = () => {
    const { user, isNotValid, helperText } = this.state;
    const regExp = /^[A-Za-z0-9_.]{3,30}$/;
    const nonAlphabet = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]$/;
    const isSpecial = /\W/;
    const allowSpecial = /[_.]$/;

    if (!user.name) {
      this.setState({
        isNotValid: { ...isNotValid, name: true },
        helperText: { ...helperText, name: NameHelperText.EMPTY_VALUE },
      });
    } else if (!regExp.test(user.name)) {
      this.setState({ isNotValid: { ...isNotValid, name: true } });
      if (nonAlphabet.test(user.name)) {
        this.setState({
          helperText: {
            ...helperText,
            name: NameHelperText.ONLY_ALPHABET,
          },
        });
      } else if (isSpecial.test(user.name) && !allowSpecial.test(user.name)) {
        this.setState({
          helperText: {
            ...helperText,
            name: NameHelperText.NO_SPECIAL_CHAR,
          },
        });
      } else if (user.name.length < 3) {
        this.setState({
          helperText: { ...helperText, name: NameHelperText.MIN_WORDS },
        });
      } else if (user.name.length > 30) {
        this.setState({
          helperText: { ...helperText, name: NameHelperText.MAX_WORDS },
        });
      }
    } else {
      this.setState({
        isNotValid: { ...isNotValid, name: false },
        helperText: { ...helperText, name: DEFAULT_HELPER_TEXT },
      });
    }
  };

  checkStatusValidation = () => {
    const { user, isNotValid, helperText } = this.state;

    if (user.status.length > 100) {
      this.setState({
        isNotValid: { ...isNotValid, status: true },
        helperText: { ...helperText, status: StatusHelperText.MAX_WORDS },
      });
    } else {
      this.setState({
        isNotValid: { ...isNotValid, status: false },
        helperText: { ...helperText, status: DEFAULT_HELPER_TEXT },
      });
    }
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
