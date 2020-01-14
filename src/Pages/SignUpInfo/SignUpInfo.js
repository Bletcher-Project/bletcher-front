import React, { Component } from "react";
import axios from "axios";

import { SignupInput, MainButton } from "../../Components";

import Fade from "@material-ui/core/Fade";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { purple } from "@material-ui/core/colors";

const defaultProps = {};
const propTypes = {};

class SignUpInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
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

    return (
      <Fade
        in={true}
        mountOnEnter
        timeout={{ appear: 1000, enter: 750, exit: 750 }}
      >
        <div className="signupPage__info">
          <div className="signupPage__info__container">
            <div className="signupPage__info__container-head">
              <div className="back">
                <a>
                  <NavigateBeforeIcon
                    style={{ color: "#bdbdbd", fontSize: 60 }}
                    onClick={this.handleStepInfoBack}
                  />
                </a>
              </div>

              <div className="title">
                <p>
                  Hello, {this.state.usertype}! <br />
                  Enter your personal information.
                </p>
              </div>
              <div style={{ width: "60px" }}></div>
            </div>
            <div className="signupPage__info__container-input">
              <SignupInput
                label="Email"
                type="email"
                value={email}
                width="210px"
                onChange={this.handleEmailCheck}
                error={!isEmailValid}
                helperText={helpEmail}
                InputProps={
                  (email !== "") & isEmailValid
                    ? {
                        endAdornment: (
                          <Fade in={true} timeout={350}>
                            <CheckCircleOutlineIcon
                              style={{ color: purple[700] }}
                            />
                          </Fade>
                        )
                      }
                    : null
                }
              />
              {/* </div>
              <div className="signupPage__info__container-input"> */}
              <SignupInput
                disabled={!isEmailValid || this.state.email === ""}
                label="Password"
                type="password"
                value={this.state.password}
                width="210px"
                onChange={this.handlePwdCheck}
                error={!isPwdValid}
                helperText={helpPwd}
                InputProps={
                  (this.state.password !== "") & isPwdValid
                    ? {
                        endAdornment: (
                          <Fade in={true} timeout={350}>
                            <CheckCircleOutlineIcon
                              style={{ color: purple[700] }}
                            />
                          </Fade>
                        )
                      }
                    : null
                }
              />
              {/* </div>
              <div className="signupPage__info__container-input"> */}
              <SignupInput
                disabled={
                  !isPwdValid || !isEmailValid || this.state.password === ""
                }
                label="Password Confirm"
                type="password"
                value={this.state.repassword}
                width="210px"
                onChange={this.handleRepwdCheck}
                onKeyPress={this.handleEnterKey}
                error={!isRepwdValid}
                helperText={isRepwdValid ? " " : helpRePwd}
                InputProps={
                  (this.state.repassword !== "") & isRepwdValid
                    ? {
                        endAdornment: (
                          <Fade in={true} timeout={350}>
                            <CheckCircleOutlineIcon
                              style={{ color: purple[700] }}
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
                onClick={this.handleProfile}
              />
            </div>
          </div>
        </div>
      </Fade>
    );
  }

  handleInfoNext = () => {
    const nextCondition = () => {
      if (
        (this.state.email !== "") &
        (this.state.password !== "") &
        (this.state.repassword !== "") &
        (this.state.isEmailValid &
          this.state.isPwdValid &
          this.state.isRepwdValid)
      ) {
        this.setState({ isInfoNext: true });
      } else {
        this.setState({ isInfoNext: false });
      }
    };
    if ((this.state.password !== "") & (this.state.repassword !== "")) {
      if (this.state.password === this.state.repassword) {
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
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const a = (bool, msg) => {
      this.setState({ isEmailValid: bool }, () => {
        this.setState({ helpEmail: msg }, () => {
          this.handleInfoNext();
        });
      });
    };
    this.setState({ email: e.target.value }, () => {
      this.handleInfoNext();
      if (this.state.email === "") {
        a(true, "Enter your email address please");
        //a(true, " ");
      } else if ((this.state.email !== "") & !regExp.test(this.state.email)) {
        a(false, "Incorrect Email Form");
      }

      if (regExp.test(this.state.email)) {
        axios
          .post("http://127.0.0.1:4000/users/email", {
            email: this.state.email
          })
          .then(res => {
            a(true, " "); //Allowed email
          })
          .catch(err => {
            a(false, "Already exists email!");
          });
      }
    });
  };

  handlePwdCheck = e => {
    const regExp = /\S[0-9a-zA-Z]{7,16}$/;

    const condition = () => {
      const Isnum = /\S[0-9]/;
      const IsChar = /\S[a-zA-Z]/;
      const IsSpeical = /\W/g;
      const a = (bool, msg) => {
        this.setState({ isPwdValid: bool }, () => {
          this.setState({ helpPwd: msg }, () => {
            this.handleInfoNext();
          });
        });
      };
      if (
        (this.state.password !== "") &
        (8 <= this.state.password.length) &
        (this.state.password.length <= 16)
      ) {
        if (
          IsChar.test(this.state.password) & !Isnum.test(this.state.password)
        ) {
          return a(false, "Num should be contained");
        } else if (
          !IsChar.test(this.state.password) & Isnum.test(this.state.password)
        ) {
          return a(false, "Alphabet should be contained");
        } else if (IsSpeical.test(this.state.password)) {
          return a(false, "Special character not allowed");
        }
      } else if (
        (this.state.password !== "") &
        (this.state.password.length < 8)
      ) {
        return a(false, "Should be more than 8 words");
      } else if (
        (this.state.password !== "") &
        (this.state.password.length > 16)
      ) {
        return a(false, "Should no greater than 16 words");
      } else if (this.state.password === "") {
        return a(true, "Enter password please");
      }
    };

    this.setState({ password: e.target.value }, () => {
      if (regExp.test(this.state.password)) {
        this.setState({ isPwdValid: true }, () => {
          this.setState({ helpPwd: " " }, () => {
            //Allowed password
            this.handleInfoNext();
            condition();
          });
        });
      } else {
        this.setState({ isPwdValid: false }, () => {
          this.handleInfoNext();
          condition();
        });
      }
    });
  };

  handleRepwdCheck = e => {
    this.setState({ repassword: e.target.value }, () => {
      if (
        this.state.repassword === "" ||
        this.state.password === this.state.repassword
      ) {
        this.setState({ isRepwdValid: true }, () => {
          this.handleInfoNext();
        });
      } else {
        this.setState({ isRepwdValid: false }, () => {
          this.setState({ helpRePwd: "Enter same password above" }, () => {
            this.handleInfoNext();
          });
        });
      }
    });
  };
}

SignUpInfo.defaultProps = defaultProps;
SignUpInfo.propTypes = propTypes;

export default SignUpInfo;
