import React, { Component } from 'react';
import axios from 'axios';

import { MainInput, MainButton } from 'Components';

import Fade from '@material-ui/core/Fade';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { purple } from '@material-ui/core/colors';

import backIcon from 'Assets/icons/signup_back.svg';
import { isEmptyString } from 'is-what';

import * as constant from '../../Constants/api_uri';

const defaultProps = {};
const propTypes = {};

class SignUpInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email ? this.props.email : '',
      password: '',
      repassword: '',
      helpEmail: ' ',
      helpPwd: ' ',
      helpRePwd: ' ',
      isInfoNext: false,
      isEmailValid: true,
      isPwdValid: true,
      isRePwdValid: true,
    };
  }

  render() {
    const { type } = this.props;
    const {
      email,
      helpEmail,
      helpPwd,
      helpRePwd,
      isEmailValid,
      isPwdValid,
      isRePwdValid,
      isInfoNext,
    } = this.state;

    return (
      <Fade
        in={true}
        mountOnEnter
        timeout={{ appear: 1000, enter: 750, exit: 750 }}
      >
        <div className="signUpPage__info">
          <div className="signUpPage__info__container">
            <div className="signUpPage__info__container__head">
              <div className="signUpPage__info__container__head-back">
                <img
                  alt="back"
                  src={backIcon}
                  width="35px"
                  style={{ cursor: 'pointer' }}
                  onClick={this.handlePrevStep}
                />
              </div>

              <div className="signUpPage__info__container__head-title">
                <p>
                  Hello, {type}! <br />
                  Enter your personal information.
                </p>
              </div>
            </div>
            <div className="signUpPage__info__container__input">
              <MainInput
                label="Email"
                type="email"
                value={email}
                width="210px"
                onChange={this.handleEmailCheck}
                error={!isEmailValid}
                helperText={helpEmail}
                InputProps={
                  !isEmptyString(email) & isEmailValid
                    ? {
                        endAdornment: (
                          <Fade in={true} timeout={350}>
                            <CheckCircleOutlineIcon
                              style={{ color: purple[700], width: '0.8em' }}
                            />
                          </Fade>
                        ),
                      }
                    : null
                }
              />
              <MainInput
                label="Password"
                type="password"
                value={this.state.password}
                width="210px"
                onChange={this.handlePwdCheck}
                error={!isPwdValid}
                helperText={helpPwd}
                InputProps={
                  !isEmptyString(this.state.password) & isPwdValid
                    ? {
                        endAdornment: (
                          <Fade in={true} timeout={350}>
                            <CheckCircleOutlineIcon
                              style={{ color: purple[700], width: '0.8em' }}
                            />
                          </Fade>
                        ),
                      }
                    : null
                }
              />
              <MainInput
                label="Password Confirm"
                type="password"
                value={this.state.repassword}
                width="210px"
                onChange={this.handleRepwdCheck}
                onKeyPress={this.handleEnterKey}
                error={!isRePwdValid}
                helperText={isRePwdValid ? ' ' : helpRePwd}
                InputProps={
                  !isEmptyString(this.state.repassword) & isRePwdValid
                    ? {
                        endAdornment: (
                          <Fade in={true} timeout={350}>
                            <CheckCircleOutlineIcon
                              style={{ color: purple[700], width: '0.8em' }}
                            />
                          </Fade>
                        ),
                      }
                    : null
                }
              />
              <MainButton
                disabled={!isInfoNext}
                text="Next"
                onClick={this.handleNextStep}
              />
            </div>
          </div>
        </div>
      </Fade>
    );
  }

  handleNextStep = () => {
    this.props.handleSignUpStep('profilePage');
    this.props.handleUserInfo({
      email: this.state.email,
      password: this.state.password,
    });
  };

  handlePrevStep = () => {
    this.props.handleSignUpStep('typePage');
  };

  handleNextBtn = () => {
    const nextCondition = () => {
      if (
        !isEmptyString(this.state.email) &
        !isEmptyString(this.state.password) &
        !isEmptyString(this.state.repassword) &
        this.state.isEmailValid &
        this.state.isPwdValid &
        this.state.isRePwdValid
      ) {
        this.setState({ isInfoNext: true });
      } else {
        this.setState({ isInfoNext: false });
      }
    };

    if (
      !isEmptyString(this.state.password) &
      !isEmptyString(this.state.repassword)
    ) {
      if (Object.is(this.state.password, this.state.repassword)) {
        this.setState({ isRePwdValid: true }, () => {
          nextCondition();
        });
      } else {
        this.setState({ isRePwdValid: false, isInfoNext: false }, () => {
          nextCondition();
        });
      }
    }
    nextCondition();
  };

  handleEmailCheck = (e) => {
    const regExp = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const changeEmailStatus = (bool, msg) => {
      this.setState({ isEmailValid: bool, helpEmail: msg }, () => {
        this.handleNextBtn();
      });
    };

    this.setState({ email: e.target.value }, () => {
      const email = this.state.email;
      if (isEmptyString(email)) {
        changeEmailStatus(false, 'Enter your email address please');
      } else if (!isEmptyString(email) & !regExp.test(email)) {
        changeEmailStatus(false, 'Incorrect Email Form');
      }

      if (regExp.test(email)) {
        window.setTimeout(() => {
          return Object.is(this.state.email, email)
            ? axios
                .get(
                  process.env.REACT_APP_SERVER_URL +
                    constant.INIT_API +
                    constant.USERS_API_GET +
                    constant.EMAIL_API_GET +
                    email,
                )
                .then((res) => {
                  if (res.status === 200) {
                    changeEmailStatus(false, 'Already exists email!');
                  } else if (res.status === 204) {
                    changeEmailStatus(true, ' '); //Allowed email
                  }
                })
                .catch((err) => {
                  console.log(err);
                })
            : null;
        }, 200);
      }
    });
  };

  handlePwdCheck = (e) => {
    const regExp = /\S[0-9a-zA-Z]{7,16}$/;

    const condition = () => {
      const Isnum = /\S[0-9]/;
      const IsChar = /\S[a-zA-Z]/;
      const IsSpeical = /\W/g;
      const changePwdStatus = (bool, msg) => {
        this.setState({ isPwdValid: bool, helpPwd: msg }, () => {
          this.handleNextBtn();
        });
      };

      if (
        !isEmptyString(this.state.password) &
        (8 <= this.state.password.length) &
        (this.state.password.length <= 16)
      ) {
        if (
          IsChar.test(this.state.password) & !Isnum.test(this.state.password)
        ) {
          return changePwdStatus(false, 'Num should be contained');
        } else if (
          !IsChar.test(this.state.password) & Isnum.test(this.state.password)
        ) {
          return changePwdStatus(false, 'Alphabet should be contained');
        } else if (IsSpeical.test(this.state.password)) {
          return changePwdStatus(false, 'Special character not allowed');
        }
      } else if (
        !isEmptyString(this.state.password) &
        (this.state.password.length < 8)
      ) {
        return changePwdStatus(false, 'Should be more than 8 words');
      } else if (
        !isEmptyString(this.state.password) &
        (this.state.password.length > 16)
      ) {
        return changePwdStatus(false, 'Should no greater than 16 words');
      } else if (isEmptyString(this.state.password)) {
        return changePwdStatus(true, 'Enter password please');
      }
    };

    this.setState({ password: e.target.value }, () => {
      if (regExp.test(this.state.password)) {
        this.setState({ isPwdValid: true, helpPwd: ' ' }, () => {
          //Allowed password
          this.handleNextBtn();
          condition();
        });
      } else {
        this.setState({ isPwdValid: false }, () => {
          this.handleNextBtn();
          condition();
        });
      }
    });
  };

  handleRepwdCheck = (e) => {
    this.setState({ repassword: e.target.value }, () => {
      if (
        isEmptyString(this.state.repassword) ||
        Object.is(this.state.password, this.state.repassword)
      ) {
        this.setState({ isRePwdValid: true }, () => {
          this.handleNextBtn();
        });
      } else {
        this.setState(
          { isRePwdValid: false, helpRePwd: 'Enter same password above' },
          () => {
            this.handleNextBtn();
          },
        );
      }
    });
  };
}

SignUpInfo.defaultProps = defaultProps;
SignUpInfo.propTypes = propTypes;

export default SignUpInfo;
