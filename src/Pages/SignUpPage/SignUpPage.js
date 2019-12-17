import React, { Component } from "react";
import { NavBar, TypeButton, MainButton } from "../../Components";

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
      usertype: "",
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
            <p className="signupPage__type-head">Choose your user type.</p>
          </Slide>
        )}
        {infoOpen & !profileOpen && (
          <Slide
            direction="left"
            in={infoOpen & !profileOpen}
            timeout={{ appear: 1000, enter: 750, exit: 750 }}
          >
            <p className="signupPage__info-head">
              Enter your personal information {this.state.usertype}
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
                content="Recreate with your creative idea."
                logo={logo_sketcher}
                onClick={this.handleTypeSketcher}
              />
              <TypeButton
                title="Creator"
                value="sketcher"
                content="Share your creation for sketchers."
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
              <TextField
                id="standard-basic"
                label="Email"
                type="email"
                onChange={this.handleEmailCheck}
                error={!isEmailValid}
              />
            </div>
            <div className="signupPage__info-input">
              <TextField
                id="standard-basic"
                label="Password"
                type="password"
                onChange={this.handlePwdCheck}
                error={!isPwdValid}
              />
            </div>
            <div className="signupPage__info-input">
              <TextField
                id="standard-basic"
                label="Re-password"
                type="password"
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
              <TextField
                id="standard-basic"
                label="name not yet"
                type="text"
                onChange={this.handleNameCheck}
                error={!isNameValid}
              />
            </div>
            <div className="signupPage__profile-input">
              <TextField
                id="standard-basic"
                label="status"
                type="text"
                onChange={this.handleStatusCheck}
                error={!isStatusValid}
              />
            </div>

            <ImageUploader //TODO Need to modify Upload component design
              withPreview={true}
              withLabel={false}
              buttonText="Choose image"
            />
            <Button disabled={this.state.name === "" || isNameValid === false}>
              Sign Up
            </Button>

            {/* example code - undesigned */}
          </div>
        </Slide>
      </div>
    );
  }

  //TODO Should solve asynchronous problem. => e.target.value doesn't get immediately
  // handleType = async (e) => {
  //
  //   const value = await e.target.value;
  //   alert(value);
  //   this.setState(
  //     {
  //       usertype: value
  //     },
  //     () => {
  //       this.handleInfo();
  //     }
  //   );
  // };

  handleTypeSketcher = () => {
    this.setState({ usertype: "sketcher " }, () => {
      this.handleInfo();
    });
  };

  handleTypeCreator = () => {
    this.setState({ usertype: "creator" }, () => {
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

  handleEmailCheck = e => {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    this.setState({ email: e.target.value }, () => {
      if (this.state.email === "") {
        this.setState({ isEmailValid: true });
      } else if (regExp.test(this.state.email)) {
        this.setState({ isEmailValid: true });
      } else {
        this.setState({ isEmailValid: false });
      }
    });
  };

  handlePwdCheck = e => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    this.setState({ password: e.target.value }, () => {
      if (regExp.test(this.state.password)) {
        this.setState({ isPwdValid: true });
      } else {
        this.setState({ isPwdValid: false });
      }
      if (this.state.password !== this.state.repassword) {
        this.setState({ isRepwdValid: false });
      } else if (this.state.password === this.state.repassword) {
        this.setState({ isRepwdValid: true });
      }
    });
  };

  handleRepwdCheck = e => {
    if (e.keyCode === 13) {
      alert("Enter!");
    }
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    this.setState({ repassword: e.target.value }, () => {
      if (
        regExp.test(this.state.repassword) &
        (this.state.password !== "") &
        (this.state.password === this.state.repassword)
      ) {
        this.setState({ isRepwdValid: true });
      } else if (this.state.password !== this.state.repassword) {
        this.setState({ isRepwdValid: false });
      }
    });
  };

  handleNameCheck = e => {
    //TODO Server side check needs to be done
    this.setState({ name: e.target.value }, () => {
      console.log(this.state.name);
    });
  };

  handleStatusCheck = e => {
    this.setState({ status: e.target.value }, () => {
      if (this.state.status.length >= 100) {
        this.setState({ isStatusValid: false });
      } else {
        this.setState({ isStatusValid: true });
      }
    });
  };
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default SignUpPage;
