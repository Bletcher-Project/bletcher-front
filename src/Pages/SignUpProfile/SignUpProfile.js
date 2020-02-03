import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as AuthAction from "../../Redux/Actions/AuthAction";

import { SignupInput, MainButton } from "../../Components";

import Fade from "@material-ui/core/Fade";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { purple } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";

import default_profile from "../../Assets/images/default_profile.svg";
import back_icon from "../../Assets/images/signup_back.svg";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    usertype: state.signupReducer.usertype,
    email: state.signupReducer.email,
    password: state.signupReducer.password
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSignupStep: stepname =>
      dispatch(AuthAction.updateSignupStep(stepname)),
    updateSignupInfo: params => dispatch(AuthAction.updateSignupInfo(params))
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
      SignupClicked,
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
                <a>
                  <img
                    src={back_icon}
                    width="35px"
                    onClick={this.handlePrevStep}
                  />
                </a>
              </div>
              <div className="signupPage__info__container__head-title">
                <p>Complete your profile.</p>
              </div>
              <div style={{ width: "60px" }}></div>
            </div>
            <div className="signupPage__info__container__content">
              <div className="signupPage__info__container__content__propic">
                <div className="signupPage__info__container__content__propic-preview">
                  <Avatar
                    src={
                      this.state.profileImgUrl
                        ? this.state.profileImgUrl
                        : default_profile
                    }
                    style={{
                      width: "110px",
                      height: "110px",
                      borderRadius: "50%"
                    }}
                  ></Avatar>
                  <input
                    accept="image/*"
                    type="file"
                    style={{ display: "none" }}
                    id="profile-upload"
                    name="img"
                    onChange={this.handleProfileImg}
                  />
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
                <SignupInput
                  label="name"
                  type="text"
                  value={name}
                  width="210px"
                  onChange={this.handleNameCheck}
                  error={!isNameValid}
                  helperText={helpName}
                  InputProps={
                    (name !== "") & isNameValid
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
                <SignupInput
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

    const a = (bool, msg) => {
      this.setState({ isNameValid: bool }, () => {
        this.setState({ helpName: msg }, () => {
          this.handleSignupBtn();
        });
      });
    };

    const repeatChk = () => {
      const name = this.state.name;
      axios
        .get("http://127.0.0.1:4000/api/users?name=".concat(name))
        .then(res => {
          a(true, " "); //Allowed name
        })
        .catch(err => {
          a(false, "Already exists name");
        });
    };

    this.setState({ name: e.target.value }, () => {
      if (regExp.test(this.state.name)) {
        repeatChk();
      } else {
        if ((this.state.name !== "") & (this.state.name.length < 3)) {
          a(false, "Should be more then 3 words");
        } else if (this.state.name.length > 30) {
          a(false, "Should no greater than 30 words");
        } else if ((this.state.name !== "") & !regExp.test(this.state.name)) {
          a(false, "Only '_' or '.' special character allowed");
        } else if (this.state.name === "") {
          a(true, "Enter your name please");
        }
      }
    });
  };

  handleProfileImg = e => {
    this.setState({ profileImg: e.target.files[0] }, () => {
      if (this.state.profileImg) {
        this.setState({
          profileImgUrl: URL.createObjectURL(this.state.profileImg)
        });
      }
    });
  };

  handleStatusCheck = e => {
    this.setState({ status: e.target.value }, () => {
      if (this.state.status.length > 100) {
        this.setState(
          {
            isStatusValid: false,
            helpStatus: "Should be less than 100 words."
          },
          () => {
            this.handleSignupBtn();
          }
        );
      } else {
        this.setState(
          {
            isStatusValid: true,
            helpStatus: " "
          },
          () => {
            this.handleSignupBtn();
          }
        );
      }
    });
  };

  handleSignupBtn = () => {
    if (
      this.state.isNameValid &
      (this.state.name !== "") &
      this.state.isStatusValid
    ) {
      this.setState({ isSignupNext: true });
    } else {
      this.setState({ isSignupNext: false });
    }
  };

  handleSignup = () => {
    this.setState({ SignupClicked: true });
    this.props.updateSignupInfo({ name: this.state.name });
    const formData = new FormData();
    formData.append("email", this.props.email);
    formData.append("name", this.state.name);
    formData.append("password", this.props.password);
    formData.append("status", this.state.status);
    formData.append("type", this.props.usertype);
    formData.append("img", this.state.profileImg);

    this.props.updateSignupStep("loadingPage");
    setTimeout(() => {
      return axios
        .post("http://127.0.0.1:4000/api/users", formData)
        .then(res => {
          this.props.updateSignupStep("successPage");
        })
        .catch(err => {
          alert("signup fail!: " + err);
        });
    }, 2000);
  };
}

SignUpProfile.defaultProps = defaultProps;
SignUpProfile.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SignUpProfile);
