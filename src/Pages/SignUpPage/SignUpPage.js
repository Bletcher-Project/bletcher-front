import React, { Component } from "react";
import axios from "axios";
import { NavBar, TypeButton, SignupInput, MainButton } from "../../Components";

import Slide from "@material-ui/core/Slide";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Avatar from "@material-ui/core/Avatar";
import { purple } from "@material-ui/core/colors";

import logo_sketcher from "../../Assets/images/logo_sketcher.png";
import logo_creator from "../../Assets/images/logo_creator.png";
import default_profile from "../../Assets/images/default_profile.svg";

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
      helpEmail: " ",
      helpPwd: " ",
      helpRePwd: " ",
      usertype: null,
      profileImg: null,
      profileImgUrl: null,
      infoOpen: false,
      profileOpen: false,
      isInfoNext: false,
      isSignupNext: false,
      isEmailValid: true,
      isPwdValid: true,
      isRepwdValid: true,
      isNameValid: true,
      isStatusValid: true
    };
  }

  render() {
    const {
      helpEmail,
      helpPwd,
      helpRePwd,
      infoOpen,
      profileOpen,
      isInfoNext,
      isSignupNext,
      isEmailValid,
      isPwdValid,
      isRepwdValid,
      isNameValid,
      isStatusValid
    } = this.state;

    let slide_header;

    if (!(infoOpen || profileOpen)) {
      slide_header = (
        <div>
          <p className="signupPage__type-head">Choose your Art type.</p>
        </div>
      );
    } else if (infoOpen & !profileOpen) {
      slide_header = (
        <div className="signupPage__info-head">
          <div className="back">
            <a>
              <NavigateBeforeIcon
                style={{ color: purple[700], fontSize: 60 }}
                onClick={this.handleInfo}
              />
            </a>
          </div>

          <div className="title">
            <p>
              Hello, {this.state.usertype}! <br />
              Enter your personal information.
            </p>
          </div>
        </div>
      );
    } else if (profileOpen) {
      slide_header = (
        <div className="signupPage__info-head">
          <div className="back">
            <a>
              <NavigateBeforeIcon
                style={{ color: purple[700], fontSize: 60 }}
                onClick={this.handleProfile}
              />
            </a>
          </div>
          <div className="title">
            <p>Complete your profile.</p>
          </div>
        </div>
      );
    }
    return (
      <div className="signupPage">
        <NavBar isActive="SignUp" />

        {slide_header}

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
          direction="up"
          in={infoOpen}
          mountOnEnter
          timeout={{ appear: 1000, enter: 750, exit: 750 }}
        >
          <div className="signupPage__info">
            <div className="signupPage__info-input">
              <SignupInput
                label="Email"
                type="email"
                width="210px"
                onChange={this.handleEmailCheck}
                // error={!isEmailValid}
                helperText={helpEmail} //TODO Make helperText return result e.g. {this.state.helpEmail}
              />
            </div>
            <div className="signupPage__info-input">
              <SignupInput
                label="Password"
                type="password"
                width="210px"
                onChange={this.handlePwdCheck}
                // error={!isPwdValid}
                helperText={isPwdValid ? " " : helpPwd}
              />
            </div>
            <div className="signupPage__info-input">
              <SignupInput
                label="Re-password"
                type="password"
                width="210px"
                onChange={this.handleRepwdCheck}
                onKeyPress={this.handleEnterKey}
                // error={!isRepwdValid}
                helperText={isRepwdValid ? " " : helpRePwd}
              />
            </div>
            <div className="signupPage__info-next">
              <MainButton
                disabled={!isInfoNext}
                text="Next"
                onClick={this.handleProfile}
              />
            </div>
          </div>
        </Slide>
        <Slide
          direction="up"
          in={profileOpen}
          mountOnEnter
          timeout={{ appear: 1000, enter: 750, exit: 750 }}
        >
          <div className="signupPage__info">
            <div className="signupPage__info__img">
              <Avatar
                className="signupPage__info__img-preview"
                src={
                  this.state.profileImgUrl
                    ? this.state.profileImgUrl
                    : default_profile
                }
                style={{ width: "120px", height: "120px" }}
              />
              <div className="signupPage__info__img-upload">
                <input
                  accept="image/*"
                  type="file"
                  style={{ display: "none" }}
                  id="profile-upload"
                  name="img"
                  onChange={this.handleProfileImg}
                />
                <label htmlFor="profile-upload">
                  <MainButton
                    size="small"
                    component="span"
                    text="Choose Image"
                  />
                </label>
              </div>
            </div>
            <div className="signupPage__info-input">
              <SignupInput
                id="standard-basic"
                label="name"
                type="text"
                width="210px"
                onChange={this.handleNameCheck}
                error={!isNameValid}
              />
            </div>
            <div className="signupPage__info-input">
              <SignupInput
                id="standard-basic"
                label="status"
                type="text"
                width="210px"
                onChange={this.handleStatusCheck}
                error={!isStatusValid}
              />
            </div>

            <div className="signupPage__info-signup">
              <MainButton
                disabled={!isSignupNext}
                text="Sign Up"
                onClick={this.handleSignup}
              />
            </div>
          </div>
        </Slide>
      </div>
    );
  }

  handlePwdCheck = e => {
    const regExp = /\S[0-9a-zA-Z]{7,15}$/;

    const condition = () => {
      const password = this.state.password;
      const Isnum = /\S[0-9]/;
      const IsChar = /\S[a-zA-Z]/;
      const IsSpeical = /\S[\D\W]/;
      const a = msg => {
        this.setState({ helpPwd: msg }, () => {
          this.setState({ isPwdValid: false }, () => {
            this.handleInfoNext();
          });
        });
      };
      if (IsChar.test(password) & !Isnum.test(password)) {
        a("Num should be contained");
      } else if (Isnum.test(password) & !IsChar.test(password)) {
        a("Alphabet should be contained");
      } else if ((password !== "") & IsSpeical.test(password)) {
        //TODO Fix : not working as well e.g. starts with just "a" or "1" => condition allowed.
        a("Special character not allowed");
      } else if ((password !== "") & (password.length < 8)) {
        a("Should be more than 8 words");
      } else if (password === "") {
        a("Enter password please");
      } else {
        this.setState({ helpPwd: " " });
      }
    };

    this.setState({ password: e.target.value }, () => {
      if (this.state.password === "" || regExp.test(this.state.password)) {
        this.setState({ isPwdValid: true }, () => {
          this.handleInfoNext();
          condition();
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
          this.handleInfoNext();
        });
      }
    });
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
        a(true, "Enter email address please");
      } else if ((this.state.email !== "") & !regExp.test(this.state.email)) {
        a(false, "Incorrect Email Form");
      }

      if (regExp.test(this.state.email)) {
        axios
          .post("http://127.0.0.1:4000/users/email", {
            email: this.state.email
          })
          .then(res => {
            console.log("available email!");
            a(true, "Allowed Email address");
          })
          .catch(err => {
            console.log("exist email!");
            a(false, "Already exists email!");
          });
      }
    });
  };

  handleInfoNext = () => {
    if ((this.state.password !== "") & (this.state.repassword !== "")) {
      if (this.state.password === this.state.repassword) {
        this.setState({ isRepwdValid: true });
      } else {
        this.setState({ isRepwdValid: false, isInfoNext: false });
      }
    }
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

  handleNameCheck = e => {
    const regExp = /^\S([0-9a-zA-z][\_\.]?){2,29}$/;
    this.setState({ name: e.target.value }, () => {
      if (regExp.test(this.state.name)) {
        //TODO Need to check server-side repeat check after entring name. not during entring name.
        axios
          .post("http://127.0.0.1:4000/users/name", { name: this.state.name })
          .then(res => {
            console.log("available name!");
            this.setState({ isNameValid: true }, () => {
              this.handleSignupBtn();
            });
          })
          .catch(err => {
            console.log("exist name!");
            this.setState({ isNameValid: false }, () => {
              this.handleSignupBtn();
            });
          });
      } else {
        this.setState({ isNameValid: false }, () => {
          this.handleSignupBtn();
        });
      }
    });
  };

  handleSignupBtn = () => {
    if (this.state.isNameValid & (this.state.name !== "")) {
      this.setState({ isSignupNext: true });
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
        alert("signup success!");
      })
      .catch(err => {
        alert("signup fail!: " + err);
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
      infoOpen: !this.state.infoOpen,
      profileOpen: !this.state.profileOpen
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

  handleStatusCheck = e => {
    this.setState({ status: e.target.value }, () => {
      this.setState({ isStatusValid: this.state.status.length <= 100 });
    });
  };
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default SignUpPage;
