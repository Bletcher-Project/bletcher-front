import React, { Component } from "react";

import { MainButton } from "../../Components";

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
        <div className="mainPage__header">
          <div className="mainPage__header__intro">
            <h1 className="mainPage__header__intro-head">Bletcher</h1>
            <p className="mainPage__header__intro-describe">
              Sketch and Create your own art.
            </p>
            <div className="mainPage__header__intro-btn">
              <MainButton text="Getting Start" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MainPage.defaultProps = defaultProps;
MainPage.propTypes = propTypes;

export default MainPage;
