import React, { Component } from "react";

import { TypeButton } from "../../Components";

import Fade from "@material-ui/core/Fade";

import logo_sketcher from "../../Assets/images/logo_sketcher.png";
import logo_creator from "../../Assets/images/logo_creator.png";

const defaultProps = {};
const propTypes = {};

class SignUpType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usertype: null
    };
  }

  render() {
    const { usertype } = this.state;

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
    this.setState({ usertype: "Sketcher" });
  };

  handleTypeCreator = () => {
    this.setState({ usertype: "Creator" });
  };
}

SignUpType.defaultProps = defaultProps;
SignUpType.propTypes = propTypes;

export default SignUpType;
