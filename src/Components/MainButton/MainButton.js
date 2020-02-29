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
    width: "150px",
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
    "&:focus": { outline: "none" }
  }
}))(Fab);

class MainButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { text, onClick, disabled, component, size, href } = this.props;
    return (
      <div className="mainButton">
        <PurpleButton
          variant="extended"
          color="primary"
          size={size ? size : "large"}
          disabled={disabled}
          onClick={onClick}
          component={component}
          href={href}
        >
          {text}
        </PurpleButton>
      </div>
    );
  }
}

MainButton.defaultProps = defaultProps;
MainButton.propTypes = propTypes;

export default MainButton;
