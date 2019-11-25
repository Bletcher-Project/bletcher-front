import React, { Component } from "react";
import { NavBar } from "../../Components";

import logo_sketcher from "../../Assets/images/logo_sketcher.png";
import logo_creator from "../../Assets/images/logo_creator.png";

const defaultProps = {};
const propTypes = {};

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="signupPage">
        <NavBar isActive="SignUp" />
        <div className="signupPage__type">
          <p className="signupPage__type-head">
            Choose your type.
          </p>
          <div className="signupPage__type__btn">
            <img className="signupPage__type__btn-img"
              src={logo_sketcher}
              width="200px" />
            <p className="signupPage__type__btn-head">Sketcher</p>
            <p className="signupPage__type__btn-describe">
              Recreate with your creative idea.
            </p>
          </div>
          <div className="signupPage__type__btn">
            <img className="signupPage__type__btn-img"
              src={logo_creator}
              width="200px" />
            <p className="signupPage__type__btn-head">Creator</p>
            <p className="signupPage__type__btn-describe">
              Share your creation for sketchers.
            </p>
          </div>
        </div>_
      </div>
    );
  }
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default SignUpPage;
