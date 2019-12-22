import React, { Component } from "react";
import axios from "axios";
import { NavBar, TypeButton, MainInput } from "../../Components";

import Slide from "@material-ui/core/Slide";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import ImageUploader from "react-images-upload";

import logo_sketcher from "../../Assets/images/logo_sketcher.png";
import logo_creator from "../../Assets/images/logo_creator.png";

const defaultProps = {};
const propTypes = {};

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      repassword: "",
      name: "",
      status: "",
      usertype: null,
      profileImg: null,
      infoOpen: false,
      profileOpen: false,
      isEmailValid: true,
      isPwdValid: true,
      isRepwdValid: true,
      isNameValid: true,
      isStatusValid: true
    };
  }

  render() {
    const {
      infoOpen,
      profileOpen,
      isEmailValid,
      isPwdValid,
      isRepwdValid,
      isNameValid,
      isStatusValid
    } = this.state;
    return (
      <div className="signupPage">
        <NavBar isActive="SignUp" />
        {!(infoOpen || profileOpen) && (
          <Slide
            direction="down"
            in={!(infoOpen || profileOpen)}
            timeout={{ appear: 1000, enter: 1000, exit: 1000 }}
          >
            <p className="signupPage__type-head">Choose your Art type.</p>
          </Slide>
        )}
        {infoOpen & !profileOpen && (
          <Slide
            direction="left"
            in={infoOpen & !profileOpen}
            timeout={{ appear: 1000, enter: 750, exit: 750 }}
          >
            <p className="signupPage__info-head">
              Hello, {this.state.usertype}! <br />
              Enter your personal information.
            </p>
          </Slide>
        )}
        {profileOpen && (
          <Slide
            direction="right"
            in={profileOpen}
            timeout={{ appear: 1000, enter: 750, exit: 750 }}
          >
            <p className="signupPage__profile-head">Complete your profile.</p>
          </Slide>
        )}

        <Slide
          direction="up"
          in={!infoOpen}
          timeout={{ appear: 1000, enter: 750, exit: 750 }}
        >
          <div className="signupPage__type">
            <div className="signupPage__type-btn">
              <TypeButton
                title="Sketcher"
                value="sketcher"
                content="Share your artisic idea."
                logo={logo_sketcher}
                onClick={this.handleTypeSketcher}
              />
              <TypeButton
                title="Creator"
                value="sketcher"
                content="Share your creation."
                logo={logo_creator}
                onClick={this.handleTypeCreator}
              />
            </div>
          </div>
        </Slide>

        <Slide
          direction="right"
          in={infoOpen}
          mountOnEnter
          timeout={{ appear: 1000, enter: 750, exit: 750 }}
        >
          <div className="signupPage__info">
            {/* example code - undesigned */}
            <ArrowBackIcon onClick={this.handleInfo} />
            <div className="signupPage__info-input">
              <MainInput
                id="standard-basic"
                label="Email"
                type="email"
                width="210px"
                onChange={this.handleEmailCheck}
                error={!isEmailValid}
              />
            </div>
            <div className="signupPage__info-input">
              <MainInput
                id="standard-basic"
                label="Password"
                type="password"
                width="210px"
                onChange={this.handlePwdCheck}
                error={!isPwdValid}
              />
            </div>
            <div className="signupPage__info-input">
              <MainInput
                id="standard-basic"
                label="Re-password"
                type="password"
                width="210px"
                onChange={this.handleRepwdCheck}
                onKeyPress={this.handleEnterKey}
                error={!isRepwdValid}
              />
            </div>
            <Button
              disabled={
                this.state.email === "" ||
                this.state.password === "" ||
                this.state.repassword === "" ||
                isEmailValid === false ||
                isPwdValid === false ||
                isRepwdValid === false
              }
              onClick={this.handleProfile}
            >
              Next
            </Button>
            {/* example code - undesigned */}
          </div>
        </Slide>
        <Slide
          direction="left"
          in={profileOpen}
          mountOnEnter
          timeout={{ appear: 1000, enter: 750, exit: 750 }}
        >
          <div className="signupPage__profile">
            {/* example code - undesigned */}
            <ArrowBackIcon onClick={this.handleProfile} />
            <div className="signupPage__profile-input">
              <MainInput
                id="standard-basic"
                label="name not yet"
                type="text"
                onChange={this.handleNameCheck}
                error={!isNameValid}
              />
            </div>
            <div className="signupPage__profile-input">
              <MainInput
                id="standard-basic"
                label="status"
                type="text"
                onChange={this.handleStatusCheck}
                error={!isStatusValid}
              />
            </div>

            {/* <ImageUploader //TODO Need to modify Upload component design
              withPreview={true}
              withLabel={false}
              buttonText="Choose image"
            /> */}
            <input type="file" name="img" onChange={this.handleProfileImg} />
            <Button
              disabled={this.state.name === "" || isNameValid === false}
              onClick={this.handleSignup}
            >
              Sign Up
            </Button>

            {/* example code - undesigned */}
          </div>
        </Slide>
      </div>
    );
  }

  handleNameCheck = e => {
    const regExp = /^\S([0-9a-zA-z][\_\.]?){2,29}$/;
    this.setState({ name: e.target.value }, () => {
      if (regExp.test(this.state.name)) {
        axios
          .post("http://127.0.0.1:4000/users/name", { name: this.state.name })
          .then(res => {
            console.log("available name!");
            this.setState({ isNameValid: true });
          })
          .catch(err => {
            console.log("exist name!");
            this.setState({ isNameValid: false });
          });
      } else {
        this.setState({ isNameValid: false });
      }
    });
  };

  handleEmailCheck = e => {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    this.setState({ email: e.target.value }, () => {
      if (this.state.email === "" || regExp.test(this.state.email)) {
        this.setState({ isEmailValid: true });
      } else {
        this.setState({ isEmailValid: false });
      }

      if (regExp.test(this.state.email)) {
        axios
          .post("http://127.0.0.1:4000/users/email", {
            email: this.state.email
          })
          .then(res => {
            console.log("available email!");
            this.setState({ isEmailValid: true });
          })
          .catch(err => {
            console.log("exist email!");
            this.setState({ isEmailValid: false });
          });
      }
    });
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
        alert("signup success!");
      })
      .catch(err => {
        alert("signup fail!");
      });
  };

  handleTypeSketcher = () => {
    this.setState({ usertype: "Sketcher" }, () => {
      this.handleInfo();
    });
  };

  handleTypeCreator = () => {
    this.setState({ usertype: "Creator" }, () => {
      this.handleInfo();
    });
  };

  handleInfo = () => {
    this.setState({
      infoOpen: !this.state.infoOpen
    });
  };

  handleProfile = () => {
    this.setState({
      profileOpen: !this.state.profileOpen
    });
  };

  handleProfileImg = e => {
    this.setState({ profileImg: e.target.files[0] });
  };

  handleEnterKey = e => {
    //TODO Need to add profile enter key case condition (after adding signup function)
    if (
      (e.charCode === 13) &
      (this.state.profileOpen === false) &
      (this.state.isEmailValid &
        this.state.isPwdValid &
        this.state.isRepwdValid)
    ) {
      this.handleProfile();
    }
  };

  handlePwdCheck = e => {
    const regExp = /\S[\*\!0-9a-zA-Z]{7,15}$/;

    this.setState({ password: e.target.value }, () => {
      this.setState({
        isPwdValid:
          this.state.password === "" || regExp.test(this.state.password)
      });
      this.setState({
        isRepwdValid: this.state.password === this.state.repassword
      });
    });
  };

  handleRepwdCheck = e => {
    this.setState({ repassword: e.target.value }, () => {
      if (
        this.state.repassword === "" ||
        this.state.password === this.state.repassword
      ) {
        this.setState({ isRepwdValid: true });
      } else if (this.state.password !== this.state.repassword) {
        this.setState({ isRepwdValid: false });
      }
    });
  };

  handleStatusCheck = e => {
    this.setState({ status: e.target.value }, () => {
      this.setState({ isStatusValid: this.state.status.length <= 100 });
    });
  };
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default SignUpPage;
