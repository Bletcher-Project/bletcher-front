import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { ServerEndPoint } from "../../Configs/Server";
import * as UserAction from "../../Redux/Actions/UserAction";

import { SignUpInput, MainButton } from "../../Components";

import Fade from "@material-ui/core/Fade";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { purple } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";

import default_profile from "../../Assets/images/default_profile.svg";
import back_icon from "../../Assets/images/signup_back.svg";
import { isEmptyString } from "is-what";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    userType: state.UserReducer.userType,
    email: state.UserReducer.email,
    password: state.UserReducer.password
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSignupStep: stepname =>
      dispatch(UserAction.updateSignupStep(stepname)),
    updateSignupInfo: params => dispatch(UserAction.updateSignupInfo(params)),
    postSignup: params => dispatch(UserAction.postSignup(params))
  };
};

class SignUpProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      status: "",
      helpName: " ",
      helpStatus: " ",
      profileImg: null,
      profileImgUrl: null,
      SignupClicked: false,
      isSignupNext: false,
      isNameValid: true,
      isStatusValid: true
    };
  }

  render() {
    const {
      name,
      status,
      isNameValid,
      helpName,
      helpStatus,
      isStatusValid,
      isSignupNext
    } = this.state;

    return (
      <div className="signupPage__info">
        <Fade
          in={true}
          mountOnEnter
          timeout={{ appear: 1000, enter: 750, exit: 750 }}
        >
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
                <p>Complete your profile.</p>
              </div>
              <div style={{ width: "60px" }}></div>
            </div>
            <div className="signupPage__info__container__content">
              <div className="signupPage__info__container__content__propic">
                <div className="signupPage__info__container__content__propic-preview">
                  <input
                    accept="image/*"
                    type="file"
                    style={{ display: "none" }}
                    id="profile-upload"
                    name="img"
                    onChange={this.handleProfileImg}
                  />
                  <label htmlFor="profile-upload">
                    <Avatar
                      src={
                        this.state.profileImgUrl
                          ? this.state.profileImgUrl
                          : default_profile
                      }
                      style={{
                        width: "110px",
                        height: "110px",
                        cursor: "pointer",
                        borderRadius: "50%"
                      }}
                    ></Avatar>
                  </label>
                </div>
                <div className="signupPage__info__container__content__propic-label">
                  <label
                    htmlFor="profile-upload"
                    style={{
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                      margin: "0"
                    }}
                  >
                    Edit Photo
                  </label>
                </div>
              </div>
              <div className="signupPage__info__container__content__input">
                <SignUpInput
                  label="name"
                  type="text"
                  value={name}
                  width="210px"
                  onChange={this.handleNameCheck}
                  error={!isNameValid}
                  helperText={helpName}
                  InputProps={
                    !isEmptyString(name) & isNameValid
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
                  label="status (optional)"
                  type="text"
                  value={status}
                  width="210px"
                  onChange={this.handleStatusCheck}
                  onKeyPress={this.handleEnterKey}
                  error={!isStatusValid}
                  helperText={helpStatus}
                />
                <MainButton
                  disabled={!isSignupNext}
                  text="Sign Up"
                  onClick={this.handleSignup}
                />
              </div>
            </div>
          </div>
        </Fade>
      </div>
    );
  }

  handlePrevStep = () => {
    this.props.updateSignupStep("infoPage");
  };

  handleNameCheck = e => {
    const regExp = /^[A-Za-z0-9_.]{3,30}$/;
    const nonAlphabet = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]$/;
    const nonSepcial = /[_.]$/;

    const changeNameStatus = (bool, msg) => {
      this.setState({ isNameValid: bool, helpName: msg }, () => {
        this.handleSignupBtn();
      });
    };

    this.setState({ name: e.target.value }, () => {
      const name = this.state.name;
      if (regExp.test(name)) {
        window.setTimeout(() => {
          return Object.is(this.state.name, name)
            ? axios
                .get(ServerEndPoint + "api/users?name=" + name)
                .then(res => {
                  changeNameStatus(true, " "); //Allowed name
                })
                .catch(err => {
                  changeNameStatus(false, "Already exists name");
                })
            : null;
        }, 200);
      } else {
        if (!isEmptyString(name) & (name.length < 3)) {
          changeNameStatus(false, "Should be more than 3 words");
        } else if (name.length > 30) {
          changeNameStatus(false, "Should no greater than 30 words");
        } else if (!isEmptyString(name) & !regExp.test(name)) {
          if (nonAlphabet.test(name)) {
            changeNameStatus(false, "Only alphabet chracter allowed");
          } else if (!nonSepcial.test(name)) {
            changeNameStatus(
              false,
              "Only '_' or '.' special character allowed"
            );
          }
        } else if (isEmptyString(name)) {
          changeNameStatus(true, "Enter your name please");
        }
      }
    });
  };

  handleProfileImg = e => {
    this.setState({ profileImg: e.target.files[0] }, () => {
      return this.state.profileImg
        ? this.setState({
            profileImgUrl: URL.createObjectURL(this.state.profileImg)
          })
        : null;
    });
  };

  handleStatusCheck = e => {
    this.setState({ status: e.target.value }, () => {
      return this.state.status.length > 100
        ? this.setState(
            {
              isStatusValid: false,
              helpStatus: "Should be less than 100 words."
            },
            () => {
              this.handleSignupBtn();
            }
          )
        : this.setState(
            {
              isStatusValid: true,
              helpStatus: " "
            },
            () => {
              this.handleSignupBtn();
            }
          );
    });
  };

  handleSignupBtn = () => {
    return this.state.isNameValid &
      !isEmptyString(this.state.name) &
      this.state.isStatusValid
      ? this.setState({ isSignupNext: true })
      : this.setState({ isSignupNext: false });
  };

  handleSignup = async () => {
    this.setState({ SignupClicked: true });
    this.props.updateSignupInfo({ name: this.state.name });
    const formData = new FormData();
    formData.append("email", this.props.email);
    formData.append("name", this.state.name);
    formData.append("password", this.props.password);
    formData.append("status", this.state.status);
    formData.append("type", this.props.userType === "Sketcher" ? 0 : 1);
    formData.append("img", this.state.profileImg);
    const postSignup = await this.props.postSignup(formData);
    return postSignup ? this.props.updateSignupStep("successPage") : null;
  };
}

SignUpProfile.defaultProps = defaultProps;
SignUpProfile.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SignUpProfile);
