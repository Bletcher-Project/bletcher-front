import React, { Component } from "react";
import { ServerEndPoint } from "../../Configs/Server";
import axios from "axios";

import { SignUpInput, MainButton } from "../../Components";

import Fade from "@material-ui/core/Fade";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { purple } from "@material-ui/core/colors";

import back_icon from "../../Assets/images/signup_back.svg";
import { isEmptyString } from "is-what";

const defaultProps = {};
const propTypes = {};

class SignUpInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email ? this.props.email : "",
      password: "",
      repassword: "",
      helpEmail: " ",
      helpPwd: " ",
      helpRePwd: " ",
      isInfoNext: false,
      isEmailValid: true,
      isPwdValid: true,
      isRepwdValid: true
    };
  }

  render() {
    const {
      email,
      helpEmail,
      helpPwd,
      helpRePwd,
      isEmailValid,
      isPwdValid,
      isRepwdValid,
      isInfoNext
    } = this.state;

    const { userType } = this.props;

    return (
      <Fade
        in={true}
        mountOnEnter
        timeout={{ appear: 1000, enter: 750, exit: 750 }}
      >
        <div className="signupPage__info">
          <div className="signupPage__info__container">
            <div className="signupPage__info__container__head">
              <div className="signupPage__info__container__head-back">
                <img
                  alt="back"
                  src={back_icon}
                  width="35px"
                  onClick={this.handlePrevStep}
                  style={{ cursor: "pointer" }}
                />
              </div>

              <div className="signupPage__info__container__head-title">
                <p>
                  Hello, {userType}! <br />
                  Enter your personal information.
                </p>
              </div>
              <div style={{ width: "60px" }}></div>
            </div>
            <div className="signupPage__info__container__input">
              <SignUpInput
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
                              style={{ color: purple[700], width: "0.8em" }}
                            />
                          </Fade>
                        )
                      }
                    : null
                }
              />
              <SignUpInput
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
                              style={{ color: purple[700], width: "0.8em" }}
                            />
                          </Fade>
                        )
                      }
                    : null
                }
              />
              <SignUpInput
                label="Password Confirm"
                type="password"
                value={this.state.repassword}
                width="210px"
                onChange={this.handleRepwdCheck}
                onKeyPress={this.handleEnterKey}
                error={!isRepwdValid}
                helperText={isRepwdValid ? " " : helpRePwd}
                InputProps={
                  !isEmptyString(this.state.repassword) & isRepwdValid
                    ? {
                        endAdornment: (
                          <Fade in={true} timeout={350}>
                            <CheckCircleOutlineIcon
                              style={{ color: purple[700], width: "0.8em" }}
                            />
                          </Fade>
                        )
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
    const info = {};
    info.email = this.state.email;
    info.password = this.state.password;
    this.props.handleSignUpStep("profilePage");
    this.props.handleUserInfo(info);
  };

  handlePrevStep = () => {
    this.props.handleSignUpStep("typePage");
  };

  handleNextBtn = () => {
    const nextCondition = () => {
      if (
        !isEmptyString(this.state.email) &
        !isEmptyString(this.state.password) &
        !isEmptyString(this.state.repassword) &
        this.state.isEmailValid &
        this.state.isPwdValid &
        this.state.isRepwdValid
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
        this.setState({ isRepwdValid: true }, () => {
          nextCondition();
        });
      } else {
        this.setState({ isRepwdValid: false, isInfoNext: false }, () => {
          nextCondition();
        });
      }
    }
    nextCondition();
  };

  handleEmailCheck = e => {
    const regExp = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const changeEmailStatus = (bool, msg) => {
      this.setState({ isEmailValid: bool, helpEmail: msg }, () => {
        this.handleNextBtn();
      });
    };
    this.setState({ email: e.target.value }, () => {
      const email = this.state.email;
      if (isEmptyString(email)) {
        changeEmailStatus(false, "Enter your email address please");
      } else if (!isEmptyString(email) & !regExp.test(email)) {
        changeEmailStatus(false, "Incorrect Email Form");
      }

      if (regExp.test(email)) {
        window.setTimeout(() => {
          return Object.is(this.state.email, email)
            ? axios
                .get(ServerEndPoint + "api/users?email=" + email)
                .then(res => {
                  changeEmailStatus(true, " "); //Allowed email
                })
                .catch(err => {
                  console.log(err);
                  changeEmailStatus(false, "Already exists email!");
                })
            : null;
        }, 200);
      }
    });
  };

  handlePwdCheck = e => {
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
          return changePwdStatus(false, "Num should be contained");
        } else if (
          !IsChar.test(this.state.password) & Isnum.test(this.state.password)
        ) {
          return changePwdStatus(false, "Alphabet should be contained");
        } else if (IsSpeical.test(this.state.password)) {
          return changePwdStatus(false, "Special character not allowed");
        }
      } else if (
        !isEmptyString(this.state.password) &
        (this.state.password.length < 8)
      ) {
        return changePwdStatus(false, "Should be more than 8 words");
      } else if (
        !isEmptyString(this.state.password) &
        (this.state.password.length > 16)
      ) {
        return changePwdStatus(false, "Should no greater than 16 words");
      } else if (isEmptyString(this.state.password)) {
        return changePwdStatus(true, "Enter password please");
      }
    };

    this.setState({ password: e.target.value }, () => {
      if (regExp.test(this.state.password)) {
        this.setState({ isPwdValid: true, helpPwd: " " }, () => {
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

  handleRepwdCheck = e => {
    this.setState({ repassword: e.target.value }, () => {
      if (
        isEmptyString(this.state.repassword) ||
        Object.is(this.state.password, this.state.repassword)
      ) {
        this.setState({ isRepwdValid: true }, () => {
          this.handleNextBtn();
        });
      } else {
        this.setState(
          { isRepwdValid: false, helpRePwd: "Enter same password above" },
          () => {
            this.handleNextBtn();
          }
        );
      }
    });
  };
}

SignUpInfo.defaultProps = defaultProps;
SignUpInfo.propTypes = propTypes;

export default SignUpInfo;
