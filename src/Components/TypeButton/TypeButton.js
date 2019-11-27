// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const defaultProps = {};
const propTypes = {};

const OutlinedButton = withStyles(theme => ({
  root: {
    width: "25%",
    display: "flex",
    color: "black",
    backgroundColor: "white",
    "&:hover": {
    
    },
    border: 1
  },
}))(Button);

class TypeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <OutlinedButton>
        { children }
      </OutlinedButton>
    );
  }
}

TypeButton.defaultProps = defaultProps;
TypeButton.propTypes = propTypes;

export default TypeButton;
