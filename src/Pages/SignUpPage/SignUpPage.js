import React, { Component } from "react";
import { NavBar, TypeButton, MainButton } from "../../Components";

import Slide from '@material-ui/core/Slide';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import logo_sketcher from "../../Assets/images/logo_sketcher.png";
import logo_creator from "../../Assets/images/logo_creator.png";

const defaultProps = {};
const propTypes = {};



class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoChecked: false
    };
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
              content="Recreate with your creativ e idea."
              logo={logo_sketcher}
              onClick={this.handleInfo}
            />
            <TypeButton
              title="Creator"
              content="Share your creation for sketchers."
              logo={logo_creator}
              onClick={this.handleInfo}
            />
          </div>
        </div>

        <Slide
          direction="right"
          in={this.state.infoChecked}
          mountOnEnter
          timeout={ {appear: 1000, enter: 750 , exit: 750} }
        >
          <div className="signupPage__info">
            <p className="signupPage__info-head">Enter your personal information.</p>

            {/* example code - undesigned */}
            <button><ArrowBackIcon onClick={this.handleInfo}/></button>
            <input name="email" placeholder="email"></input>
            <input name="pwd" placeholder="password"></input>
            <input name="pwd_confirm" placeholder="password confirm"></input>
            <MainButton text="Next" />
            {/* example code - undesigned */}

          </div>
        </Slide>

      </div>
    );
  }

  handleInfo = () => {
    console.log("button clicked!");
    this.setState({
      infoChecked: !this.state.infoChecked
    });
  };
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default SignUpPage;
