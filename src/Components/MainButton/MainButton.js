// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";

import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import { purple } from "@material-ui/core/colors";

const defaultProps = {};
const propTypes = {};

const PurpleButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700]
    }
  }
}))(Fab);

class MainButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { text, onClick } = this.props;
    return (
      <div className="mainButton">
        <PurpleButton variant="contained" color="primary" onClick={onClick}>
          {text}
        </PurpleButton>
      </div>
    );
  }
}

MainButton.defaultProps = defaultProps;
MainButton.propTypes = propTypes;

export default MainButton;
