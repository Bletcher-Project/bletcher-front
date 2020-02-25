import React, { Component } from "react";

import { connect } from "react-redux";
import * as AuthAction from "../../Redux/Actions/AuthAction";

import { NavBar, MainButton, MainInput } from "../../Components";
import BackgroundSlider from "react-background-slider";
import cx from "classnames";

import bgImage1 from "../../Assets/bg-image/bg-1.jpg";
import bgImage2 from "../../Assets/bg-image/bg-2.jpg";
import bgImage3 from "../../Assets/bg-image/bg-3.jpg";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    // isLogin: ""
  };
};

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      isIdValid: true,
      isPwValid: true,
      idErrMsg: "",
      pwErrMsg: "",
      id: "",
      password: ""
    };
    this.SignIn = React.createRef();
    this.Intro = React.createRef();
  }

  render() {
    const { id, password } = this.state;
    return (
      <div className="mainPage">
        <NavBar isActive="main" />
        <BackgroundSlider
          images={[bgImage1, bgImage2, bgImage3]}
          duration={10}
          transition={2}
        />
        <div className="mainPage__header">
          <div className="mainPage__header__intro" ref={this.Intro}>
            <h1 className="mainPage__header__intro-head">Bletcher</h1>
            <p className="mainPage__header__intro-describe">
              Sketch and Create your own art.
            </p>
            <div className="mainPage__header__intro-btn">
              <MainButton text="Getting Start" onClick={this.handleStart} />
            </div>
          </div>

          <div className="mainPage__header__signIn" ref={this.SignIn}>
            <div className="mainPage__header__signIn__part">
              <div
                className={cx("mainPage__header__signIn__part-container", {
                  "mainPage__header__signIn__part-container-on":
                    id !== "" || password !== ""
                })}
              >
                <div className="mainPage__header__signIn__part__email">
                  <MainInput
                    className="mainPage__header__signIn__part__email__input"
                    label="Email / Name"
                    type="text"
                    width={250}
                    onChange={e => this.setState({ id: e.target.value, isIdValid: true, idErrMsg: "" })}
                    onKeyPress={this.handleEnter}
                    error={!this.state.isIdValid}
                    helperText={this.state.idErrMsg}
                  />
                </div>
                <div className="mainPage__header__signIn__part__password">
                  <MainInput
                    className="mainPage__header__signIn__part__password__input"
                    label="Password"
                    type="password"
                    name="password"
                    width={250}
                    onChange={e => this.setState({ password: e.target.value, isPwValid: true, pwErrMsg: "" })}
                    onKeyPress={this.handleEnter}
                    error={!this.state.isPwValid}
                    helperText={this.state.pwErrMsg}
                  />
                </div>
                <div className="mainPage__header__signIn__part-btn">
                  <MainButton text="Sign In" onClick={this.handleSignIn} />
                </div>
                <div className="mainPage__header__signIn__part__signUpLink">
                  <a href="/signup">Don’t have an account?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleStart = () => {
    this.SignIn.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  handleEnter = e => {
    if (e.key === "Enter") {
      this.handleSignIn();
    }
  }

  handleSignIn = () => {
    const { dispatch, history } = this.props;
    const { id, password } = this.state;
    if (id === "" && password === "") {
      this.setState({ isIdValid: false, idErrMsg: "Fill this field.", isPwValid: false, pwErrMsg: "Fill this field." })
    } else if (id === "") {
      this.setState({ isIdValid: false, idErrMsg: "Fill this field." })
    } else if (password === "") {
      this.setState({ isPwValid: false, pwErrMsg: "Fill this field." })
    } else {
      const params = { id: id, password: password };
      dispatch(AuthAction.postSignIn(params)).then(async result => {
        if (result === "failed") {
          // 로그인 fail 시 코드 작성
          alert("Login Failed!");
        } else {
          await dispatch(AuthAction.getUser(result));
          await history.push({
            pathname: "/home"
          });
        }
      });
    }
  };
}

MainPage.defaultProps = defaultProps;
MainPage.propTypes = propTypes;

export default connect(mapStateToProps)(MainPage);
