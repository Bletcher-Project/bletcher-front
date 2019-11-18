import React, { Component } from "react";

import { MainButton, NavBar } from "../../Components";

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
        <NavBar isActive="main"/>
        {!isClicked ? (
          <div className="mainPage__header">
            <div className="mainPage__header__intro">
              <h1 className="mainPage__header__intro-head">Bletcher</h1>
              <p className="mainPage__header__intro-describe">
                Sketch and Create your own art.
              </p>
              <div className="mainPage__header__intro-btn">
                <MainButton text="Getting Start" onClick={this.handleSignIn} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  handleSignIn = () => {
    this.setState({ isClicked: true });
  };
}

MainPage.defaultProps = defaultProps;
MainPage.propTypes = propTypes;

export default MainPage;
