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
    }
  }
})(TextField);

class MainInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { label, type, name, width } = this.props;
    return (
      <div className="mainInput">
        <PurpleInput
          label={label}
          type={type}
          name={name}
          style={{ width: width }}
        />
      </div>
    );
  }
}

MainInput.defaultProps = defaultProps;
MainInput.propTypes = propTypes;

export default MainInput;
