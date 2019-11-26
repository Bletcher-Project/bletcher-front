import React, { Component } from "react";
import { NavBar } from "../../Components";

import Button from '@material-ui/core/Button';

import logo_sketcher from "../../Assets/images/logo_sketcher.png";
import logo_creator from "../../Assets/images/logo_creator.png";
import { withStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

const defaultProps = {};
const propTypes = {};

const TypeButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

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
          <div className="signupPage__type__btn">
            <TypeButton variant="root">
              <img className="signupPage__type__btn-img" src={logo_sketcher} alt="sketcher"/>
              <p className="signupPage__type__btn-head">Sketcher</p>
              <p className="signupPage__type__btn-describe">
                Recreate with your creative idea.
              </p>
            </TypeButton>
          </div>
          <div className="signupPage__type__btn">
            <TypeButton>
              <img className="signupPage__type__btn-img" src={logo_creator} alt="creator"/>
              <p className="signupPage__type__btn-head">Creator</p>
              <p className="signupPage__type__btn-describe">
                Share your creation for Sketchers.
              </p>
            </TypeButton>
          </div>
        </div>
      </div>
    );
  }
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default SignUpPage;
