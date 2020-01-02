// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

const defaultProps = {};
const propTypes = {};

const PurpleInput = withStyles({
  root: {
    "& label.Mui-focused": {
      color: purple[700]
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: purple[700]
    },
    "& .MuiFormLabel-root.Mui-error": {
      color: purple[700]
    },
    "& .MuiFormHelperText-root": {
      fontSize: "0.7rem",
      textAlign: "right"
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
      disabled,
      label,
      type,
      name,
      width,
      onChange,
      onKeyPress,
      error,
      required,
      helperText
    } = this.props;
    return (
      <div className="mainInput">
        <PurpleInput
          disabled={disabled}
          label={label}
          type={type}
          name={name}
          style={{ width: width }}
          onChange={onChange}
          onKeyPress={onKeyPress}
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
