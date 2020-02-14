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
    "& label.Mui-error": {
      color: "red"
    },
    "& .Mui-error:after": {
      borderBottomColor: "red"
    }
  }
})(TextField);

class MainInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { label, type, name, width, onChange, onKeyPress, error, helperText } = this.props;
    return (
      <div className="mainInput">
        <PurpleInput
          label={label}
          type={type}
          name={name}
          style={{ width: width }}
          onChange={onChange}
          onKeyPress={onKeyPress}
          error={error}
          helperText={helperText}
        />
      </div>
    );
  }
}

MainInput.defaultProps = defaultProps;
MainInput.propTypes = propTypes;

export default MainInput;
