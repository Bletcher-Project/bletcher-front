import React, { Component } from "react";

<<<<<<< Page/MainPage
=======
import logo from "../../logo.svg";

import { MainButton } from "../../Components";

>>>>>>> MainButton #1
const defaultProps = {};
const propTypes = {};

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="mainPage">
<<<<<<< Page/MainPage
        <div className="mainPage__header">
          <div className="mainPage__header__intro">
            <h1 className="mainPage__header__intro-head">Bletcher</h1>
            <p className="mainPage__header__intro-describe">
              Sketch and Create your own art.
            </p>
          </div>
        </div>
=======
        <img src={logo} width="40px" alt="logo" />
        This is Main Page.
        <MainButton text="Getting Start" />
>>>>>>> MainButton #1
      </div>
    );
  }
}

MainPage.defaultProps = defaultProps;
MainPage.propTypes = propTypes;

export default MainPage;
