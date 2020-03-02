import React, { Component } from "react";

import { TypeButton } from "../../Components";

import Fade from "@material-ui/core/Fade";

import logoSketcher from "../../Assets/images/logo_sketcher.png";
import logoCreator from "../../Assets/images/logo_creator.png";

const defaultProps = {};
const propTypes = {};

class SignUpType extends Component {
  render() {
    return (
      <Fade in={true} timeout={{ appear: 1200, enter: 1200, exit: 750 }}>
        <div className="signUpPage__type">
          <div className="signUpPage__type__container">
            <div className="signUpPage__type__container-head">
              <p>Choose your Art type.</p>
            </div>
            <div className="signUpPage__type__container-btn">
              <TypeButton
                title="Sketcher"
                value="sketcher"
                content="Share your artisic idea."
                logo={logoSketcher}
                onClick={this.handleTypeSketcher}
              />
              <TypeButton
                title="Creator"
                value="sketcher"
                content="Share your creation."
                logo={logoCreator}
                onClick={this.handleTypeCreator}
              />
            </div>
          </div>
        </div>
      </Fade>
    );
  }

  handleTypeSketcher = () => {
    this.props.handleSignUpStep("infoPage");
    this.props.handleUserInfo({ type: "Sketcher" });
  };

  handleTypeCreator = () => {
    this.props.handleSignUpStep("infoPage");
    this.props.handleUserInfo({ type: "Creator" });
  };
}

SignUpType.defaultProps = defaultProps;
SignUpType.propTypes = propTypes;

export default SignUpType;
