import React, { Component } from "react";

import { NavBar, MainButton, MainInput } from "../../Components";
import BackgroundSlider from "react-background-slider";
import cx from "classnames";
import "animate.css";
import WOW from "wowjs";

import bgImage1 from "../../Assets/bg-image/bg-1.jpg";
import bgImage2 from "../../Assets/bg-image/bg-2.jpg";
import bgImage3 from "../../Assets/bg-image/bg-3.jpg";

const defaultProps = {};
const propTypes = {};

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isClicked: false, email: "", password: "" };
    this.SignIn = React.createRef();
    this.Intro = React.createRef();
  }

  componentDidMount() {
    new WOW.WOW().init();
  }

  render() {
    const { email, password } = this.state;
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
                    email !== "" || password !== ""
                })}
              >
                <div className="mainPage__header__signIn__part__email">
                  <MainInput
                    className="mainPage__header__signIn__part__email__input"
                    label="Email / Name"
                    type="email"
                    name="email"
                    width={250}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </div>
                <div className="mainPage__header__signIn__part__password">
                  <MainInput
                    className="mainPage__header__signIn__part__password__input"
                    label="Password"
                    type="password"
                    name="password"
                    width={250}
                    onChange={e => this.setState({ password: e.target.value })}
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

  handleSignIn = () => {
    // Sign In Action
  };
}

MainPage.defaultProps = defaultProps;
MainPage.propTypes = propTypes;

export default MainPage;
