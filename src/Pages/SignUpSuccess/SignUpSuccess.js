import React, { Component } from "react";
import axios from "axios";
import { MainButton } from "../../Components";

import logo_sketcher from "../../Assets/images/logo_sketcher.png";
import logo_creator from "../../Assets/images/logo_creator.png";

const defaultProps = {};
const propTypes = {};

class SignUpProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;
    const { usertype, name } = this.props;

    return (
      <div
        className="signupPage__success"
        // style={{
        //   backgroundImage: `url(${signup_back})`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center center"
        // }}
      >
        <div className="signupPage__success-head">
          Hello! {usertype} {name}!
        </div>
        <div className="signupPage__success-logo">
          {usertype === "Sketcher" ? (
            <img src={logo_sketcher} width="130px" />
          ) : (
            <img src={logo_creator} width="130px" />
          )}
        </div>
        <div className="signupPage__success-desc">
          {usertype === "Sketcher"
            ? "Login and Sketch your creative idea."
            : "Login and Create your own work."}
        </div>

        <MainButton text="Sign In!" onClick={this.handleSignIn} />
      </div>
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
