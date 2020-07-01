import React, { Component } from "react";

import { MainButton } from "Components";

import Fade from "@material-ui/core/Fade";

import logoSketcher from "Assets/images/logo_sketcher.png";
import logoCreator from "Assets/images/logo_creator.png";

const defaultProps = {};
const propTypes = {};

class SignUpProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { type, name } = this.props;

    return (
      <Fade
        in={true}
        mountOnEnter
        timeout={{ appear: 5000, enter: 5000, exit: 750 }}
      >
        <div className="signUpPage__success">
          <div className="signUpPage__success-head">
            Hello! {type} {name}!
          </div>
          <div className="signUpPage__success-logo">
            {type === "Sketcher" ? (
              <img alt="sketcher" src={logoSketcher} width="130px" />
            ) : (
                <img alt="creator" src={logoCreator} width="130px" />
              )}
          </div>
          <div className="signUpPage__success-desc">
            {type === "Sketcher"
              ? "Login and Sketch your creative idea."
              : "Login and Create your own work."}
          </div>

          <MainButton text="Sign In!" href="/signin" />
        </div>
      </Fade>
    );
  }
}

SignUpProfile.defaultProps = defaultProps;
SignUpProfile.propTypes = propTypes;

export default SignUpProfile;
