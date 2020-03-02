import React, { Component } from "react";
import { connect } from "react-redux";
import * as UserAction from "../../Redux/Actions/UserAction";
import { TypeButton } from "../../Components";

import Fade from "@material-ui/core/Fade";

import logo_sketcher from "../../Assets/images/logo_sketcher.png";
import logo_creator from "../../Assets/images/logo_creator.png";

const defaultProps = {};
const propTypes = {};

class SignUpType extends Component {
  render() {
    return (
      <Fade in={true} timeout={{ appear: 1200, enter: 1200, exit: 750 }}>
        <div className="signupPage__type">
          <div className="signupPage__type__container">
            <div className="signupPage__type__container-head">
              <p>Choose your Art type.</p>
            </div>
            <div className="signupPage__type__container-btn">
              <TypeButton
                title="Sketcher"
                value="sketcher"
                content="Share your artisic idea."
                logo={logo_sketcher}
                onClick={this.handleTypeSketcher}
              />
              <TypeButton
                title="Creator"
                value="sketcher"
                content="Share your creation."
                logo={logo_creator}
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
    this.props.handleUserInfo({ userType: "Sketcher" });
  };

  handleTypeCreator = () => {
    this.props.handleSignUpStep("infoPage");
    this.props.handleUserInfo({ userType: "Creator" });
  };
}

SignUpType.defaultProps = defaultProps;
SignUpType.propTypes = propTypes;

export default SignUpType;
