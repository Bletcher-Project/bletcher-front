import React, { Component } from "react";
import { connect } from "react-redux";
import * as AuthAction from "../../Redux/Actions/AuthAction";
import { TypeButton } from "../../Components";

import Fade from "@material-ui/core/Fade";

import logo_sketcher from "../../Assets/images/logo_sketcher.png";
import logo_creator from "../../Assets/images/logo_creator.png";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return { usertype: state.signupReducer.usertype };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserType: usertype => dispatch(AuthAction.updateUserType(usertype)),
    updateSignupStep: stepname =>
      dispatch(AuthAction.updateSignupStep(stepname))
  };
};

class SignUpType extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;

    return (
      <Fade in={true} timeout={{ appear: 1200, enter: 1200, exit: 750 }}>
        <div className="signupPage__type">
          <div className="signupPage__type-head">
            <p>Choose your Art type.</p>
          </div>
          <div className="signupPage__type-btn">
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
      </Fade>
    );
  }

  handleTypeSketcher = () => {
    this.props.updateUserType("Sketcher");
    this.props.updateSignupStep("infoPage");
  };

  handleTypeCreator = () => {
    this.props.updateUserType("Creator");
    this.props.updateSignupStep("infoPage");
  };
}

SignUpType.defaultProps = defaultProps;
SignUpType.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SignUpType);
