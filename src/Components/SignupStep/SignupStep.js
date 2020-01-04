import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const Styles = {
  root: {
    width: "100%"
  },
  backButton: {
    // marginRight: theme.spacing(1)
  },
  instructions: {
    // marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1)
  }
};

class SignupStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Activestep: 0
    };
  }

  render() {
    const steps = [
      "Select Art type",
      "Type Account Info",
      "Type User Info"
    ];

    return (
      <div className={this.props.classes.root}>
        <Stepper activeStep={this.props.activestep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    );
  }

}

SignupStep.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(Styles)(SignupStep);
