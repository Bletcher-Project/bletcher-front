import React, { Component } from "react";

import { NavBar, MainButton, MainInput } from "../../Components";
import BackgroundSlider from "react-background-slider";

import bgImage1 from "../../Assets/bg-image/bg-1.jpg";
import bgImage2 from "../../Assets/bg-image/bg-2.jpg";
import bgImage3 from "../../Assets/bg-image/bg-3.jpg";
import bgImage4 from "../../Assets/bg-image/bg-4.jpg";

const defaultProps = {};
const propTypes = {};

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isClicked: false };
  }

  render() {
    const { isClicked } = this.state;
    console.log(this.state.isClicked);
    return (
      <div className="mainPage">
        <NavBar isActive="main" />
        <BackgroundSlider
          images={[bgImage2, bgImage1]}
          duration={20}
          transition={2}
        />
        <div className="mainPage__header">
          {!isClicked ? (
            <div className="mainPage__header__intro">
              <h1 className="mainPage__header__intro-head">Bletcher</h1>
              <p className="mainPage__header__intro-describe">
                Sketch and Create your own art.
              </p>
              <div className="mainPage__header__intro-btn">
                <MainButton text="Getting Start" onClick={this.handleStart} />
              </div>
            </div>
          ) : (
            <div className="mainPage__header__signIn">
              <div className="mainPage__header__signIn-container">
                <div className="mainPage__header__signIn__email">
                  <MainInput
                    className="mainPage__header__signIn__email__input"
                    label="Email / Name"
                    type="email"
                    name="email"
                    width={250}
                  />
                </div>
                <div className="mainPage__header__signIn__password">
                  <MainInput
                    className="mainPage__header__signIn__password__input"
                    label="Password"
                    type="password"
                    name="password"
                    width={250}
                  />
                </div>
                <div className="mainPage__header__signIn-btn">
                  <MainButton text="Sign In" onClick={this.handleSignIn} />
                </div>
                <div className="mainPage__header__signIn__signUpLink">
                  <a href="/signup">Don’t have an account?</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  handleStart = () => {
    this.setState({ isClicked: true });
  };

  handleSignIn = () => {
    this.setState({ isClicked: false });
  };
}

MainPage.defaultProps = defaultProps;
MainPage.propTypes = propTypes;

export default MainPage;
