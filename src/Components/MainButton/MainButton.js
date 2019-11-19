// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import { purple } from "@material-ui/core/colors";

const defaultProps = {};
const propTypes = {};

const PurpleButton = withStyles(theme => ({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 17,
    padding: "0 20px",
    color: theme.palette.getContrastText(purple[600]),
    backgroundColor: purple[600],
    "&:hover": {
      color: purple[600],
      border: "2px solid",
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: purple[600]
    },
    "&:active": {
      boxShadow: "none"
    },
    "&:focus": {}
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
<<<<<<< HEAD
        <PurpleButton
          variant="contained"
          color="primary"
          size="large"
          onClick={onClick}
        >
=======
        <PurpleButton variant="contained" color="primary" onClick={onClick}>
>>>>>>> MainPage
          {text}
        </PurpleButton>
      </div>
    );
  }
}

MainButton.defaultProps = defaultProps;
MainButton.propTypes = propTypes;

export default MainButton;
