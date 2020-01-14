import React, { Component } from "react";
import axios from "axios";

import { SignupInput, MainButton } from "../../Components";

import Fade from "@material-ui/core/Fade";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { purple } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Fab from "@material-ui/core/Fab";

import default_profile from "../../Assets/images/default_profile.svg";

const defaultProps = {};
const propTypes = {};

class SignUpProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      status: "",
      helpName: " ",
      profileImg: null,
      profileImgUrl: null,
      isSignupNext: false,
      isNameValid: true,
      isStatusValid: true,
      isSignUpSuc: false
    };
  }

  render() {
    const {
      name,
      status,
      isNameValid,
      helpName,
      isStatusValid,
      isSignupNext
    } = this.state;

    return (
      <Fade
        // direction="up"
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
                    onClick={this.handleStepProfileBack}
                  />
                </a>
              </div>
              <div className="title">
                {/* <p></p> */}
                <p>Complete your profile.</p>
              </div>
              <div style={{ width: "60px" }}></div>
            </div>
            <div className="signupPage__info__container__img">
              <div className="signupPage__info__container__img__profile">
                <div className="signupPage__info__container__img__profile-preview">
                  <Avatar
                    src={
                      this.state.profileImgUrl
                        ? this.state.profileImgUrl
                        : default_profile
                    }
                    style={{
                      width: "130px",
                      height: "130px",
                      borderRadius: "50%",
                      border: "solid 2px purple"
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
                  <Fab
                    color="primary"
                    style={{
                      width: "36px",
                      height: "36px",
                      position: "relative",
                      top: "-38px",
                      right: "-48px",
                      outline: "none"
                    }}
                  >
                    <label
                      htmlFor="profile-upload"
                      style={{
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                        margin: "0"
                      }}
                    >
                      <PhotoCameraIcon />
                    </label>
                  </Fab>
                </div>

                <div className="signupPage__info__container__img__profile-upload"></div>
              </div>
              <div className="signupPage__info__container__img__input">
                <SignupInput
                  id="standard-basic"
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
                                style={{ color: purple[700] }}
                              />
                            </Fade>
                          )
                        }
                      : null
                  }
                />
                <SignupInput
                  id="standard-basic"
                  label="status (optional)"
                  type="text"
                  value={status}
                  width="210px"
                  onChange={this.handleStatusCheck}
                  onKeyPress={this.handleEnterKey}
                  error={!isStatusValid}
                />
              </div>
            </div>
            <div className="signupPage__info__container-signup">
              <MainButton
                disabled={!isSignupNext}
                text="Sign Up"
                onClick={this.handleSignup}
              />
            </div>
          </div>
        </div>
      </Fade>
    );
  }

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
      axios
        .post("http://127.0.0.1:4000/users/name", { name: this.state.name })
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
      this.setState({ isStatusValid: this.state.status.length <= 100 });
    });
  };

  handleSignupBtn = () => {
    if (this.state.isNameValid & (this.state.name !== "")) {
      this.setState({ isSignupNext: true });
    } else {
      this.setState({ isSignupNext: false });
    }
  };

  handleSignup = () => {
    const formData = new FormData();
    formData.append("email", this.state.email);
    formData.append("name", this.state.name);
    formData.append("password", this.state.password);
    formData.append("status", this.state.status);
    formData.append("type", this.state.usertype);
    formData.append("img", this.state.profileImg);

    return axios
      .post("http://127.0.0.1:4000/signup", formData)
      .then(res => {
        this.setState({ isSignUpSuc: true });
      })
      .catch(err => {
        alert("signup fail!: " + err);
        this.setState({ isSignUpSuc: false });
      });
  };
}

SignUpProfile.defaultProps = defaultProps;
SignUpProfile.propTypes = propTypes;

export default SignUpProfile;
