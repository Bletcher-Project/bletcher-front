import React, { Component } from "react";
import { NavBar, TypeButton } from "../../Components";

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
            Choose your user type.
          </p>
          <div className="signupPage__type-btn">
            <TypeButton 
            title="Sketcher" 
            content="Recreate with your creative idea." 
            logo={logo_sketcher} />
            <TypeButton 
            title="Creator" 
            content="Share your creation for sketchers." 
            logo={logo_creator} />
          </div>
        </div>
      </div>
    );
  }
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default SignUpPage;
