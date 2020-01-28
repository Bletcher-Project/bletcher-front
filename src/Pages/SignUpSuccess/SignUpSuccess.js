import React, { Component } from "react";
import { connect } from "react-redux";

import { MainButton } from "../../Components";

import logo_sketcher from "../../Assets/images/logo_sketcher.png";
import logo_creator from "../../Assets/images/logo_creator.png";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    usertype: state.signupReducer.usertype,
    name: state.signupReducer.name
  };
};

class SignUpProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;
    const { usertype, name } = this.props;

    return (
      <div className="signupPage__success">
        <div className="signupPage__success-head">
          Hello! {usertype} {name}!
        </div>
        <div className="signupPage__success-logo">
          {usertype === "Sketcher" ? (
            <img src={logo_sketcher} width="130px" />
          ) : (
            <img src={logo_creator} width="130px" />
          )}
        </div>
        <div className="signupPage__success-desc">
          {usertype === "Sketcher"
            ? "Login and Sketch your creative idea."
            : "Login and Create your own work."}
        </div>

        <MainButton text="Sign In!" onClick={this.handleSignIn} />
      </div>
    );
  }
}

SignUpProfile.defaultProps = defaultProps;
SignUpProfile.propTypes = propTypes;

export default connect(mapStateToProps)(SignUpProfile);
