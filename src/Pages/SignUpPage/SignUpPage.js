import React, { Component } from "react";
import { NavBar, TypeButton, MainButton } from "../../Components";

import Slide from '@material-ui/core/Slide';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
      infoOpen: false,
      profileOpen: false,
      isEmailValid: false,
      isPwdValid: false,
      isRepwdValid: false,
      isNameValid: true,
      isStatusValid: false
    };
  }

  render() {
    const { infoOpen, profileOpen, isEmailValid, isPwdValid, isRepwdValid, isNameValid, isStatusValid } = this.state;
    return (
      <div className="signupPage">
        <NavBar isActive="SignUp" />
        <div className="signupPage__type">
          <p className="signupPage__type-head">
            Choose your user type.
          </p>
          <div className="signupPage__type-btn">
            <TypeButton
              title="Sketcher"
              content="Recreate with your creative idea."
              logo={logo_sketcher}
              onClick={this.handleInfo}
            />
            <TypeButton
              title="Creator"
              content="Share your creation for sketchers."
              logo={logo_creator}
              onClick={this.handleInfo}
            />
          </div>
        </div>

        <Slide
          direction="right"
          in={infoOpen}
          mountOnEnter
          timeout={{ appear: 1000, enter: 750, exit: 750 }}
        >
          <div className="signupPage__info">
            <p className="signupPage__info-head">Enter your personal information.</p>

            {/* example code - undesigned */}
            <ArrowBackIcon onClick={this.handleInfo} />
            <div className="signupPage__info-input">
              <TextField
                id="standard-basic"
                label="Email"
                type="email"
                onChange={this.handleEmailCheck}
                error={!isEmailValid} />
            </div>
            <div className="signupPage__info-input">
              <TextField
                id="standard-basic"
                label="Password"
                type="password"
                onChange={this.handlePwdCheck}
                error={!isPwdValid} />
            </div>
            <div className="signupPage__info-input">
              <TextField
                id="standard-basic"
                label="Re-password"
                type="password"
                onChange={this.handleRepwdCheck}
                error={!isRepwdValid} />
            </div>
            <Button
              disabled={!(isEmailValid & isPwdValid & isRepwdValid)}
              onClick={this.handleProfile} >
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
            <p className="signupPage__profile-head">Complete your profile.</p>

            {/* example code - undesigned */}
            <ArrowBackIcon onClick={this.handleProfile} />
            <div className="signupPage__profile-input">
              <TextField
                id="standard-basic"
                label="name not yet"
                type="text"
                error={!isNameValid} />
            </div>
            <div className="signupPage__profile-input">
              <TextField
                id="standard-basic"
                label="status"
                type="text"
                onChange={this.handleStatusCheck}
                error={!isStatusValid} />
            </div>
            <Button text="choose image..." />
            <Button
              disabled={!(isNameValid&isStatusValid)} >
              Next
            </Button>
            {/* example code - undesigned */}

          </div>
        </Slide>

      </div>
    );
  }

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

  handleEmailCheck = e => {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    this.setState({ email: e.target.value });
    if (regExp.test(e.target.value)) {
      this.setState({ isEmailValid: true });
    } else {
      this.setState({ isEmailValid: false });
    }
  }

  handlePwdCheck = e => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    this.setState({ password: e.target.value });
    if (regExp.test(e.target.value)) {
      this.setState({ isPwdValid: true });
    } else {
      this.setState({ isPwdValid: false });
    }
  }

  handleRepwdCheck = e => {
    this.setState({ repassword: e.target.value },
      () => {
        if (this.state.password === this.state.repassword) {
          this.setState({ isRepwdValid: true });
        } else {
          this.setState({ isRepwdValid: false });
        }
      });
  }

  handleNameCheck = e => { // server side check needs to be done
    this.setState({ name: e.target.value });
  }

  handleStatusCheck = e => {
    this.setState({ status: e.target.value },
      () => {
        if (this.state.status.length >= 100) {
          this.setState({ isStatusValid: false });
        } else {
          this.setState({ isStatusValid: true });
        }
      });
    
  }


}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default SignUpPage;
