// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

const defaultProps = {};
const propTypes = {};

const PurpleInput = withStyles({ //TODO Need to Fix styles
  root: {
    "& label.Mui-focused": {
      color: purple[700]
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: purple[700]
    }
  }
})(TextField);

class MainInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      label,
      type,
      name,
      width,
      onChange,
      error,
      required,
      helperText
    } = this.props;
    return (
      <div className="mainInput">
        <PurpleInput
          label={label}
          type={type}
          name={name}
          style={{ width: width }}
          onChange={onChange}
          error={error}
          required={required}
          helperText={helperText}
        />
      </div>
    );
  }
}

MainInput.defaultProps = defaultProps;
MainInput.propTypes = propTypes;

export default MainInput;
