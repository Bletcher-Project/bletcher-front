import React, { Component } from "react";

import { MainButton, NavBar } from "../../Components";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

const defaultProps = {};
const propTypes = {};

const PurpleInput = withStyles({
  root: {
    "& label.Mui-focused": {
      color: purple[700]
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: purple[700]
    }
  }
})(TextField);

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isClicked: true };
  }

  render() {
    const { isClicked } = this.state;
    console.log(this.state.isClicked);
    return (
      <div className="mainPage">
        <NavBar isActive="main" />
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
              <div className="mainPage__header__signIn__email">
                <PurpleInput
                  className="mainPage__header__signIn__email__input"
                  label="Email / Name"
                  type="email"
                  name="email"
                  style={{ width: 250 }}
                />
              </div>
              <div className="mainPage__header__signIn__password">
                <PurpleInput
                  className="mainPage__header__signIn__password__input"
                  label="Password"
                  type="password"
                  name="password"
                  style={{ width: 250 }}
                />
              </div>
              <div className="mainPage__header__signIn-btn">
                <MainButton text="Sign In" onClick={this.handleSignIn} />
              </div>
              <div className="mainPage__header__signIn__signUpLink">
                <a href="/signup">Don’t have an account?</a>
              </div>
            </div>
          )}
        </div>

        <div className="mainPage__header"></div>
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
