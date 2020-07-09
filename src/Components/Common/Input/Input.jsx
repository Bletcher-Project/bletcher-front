import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

const defaultProps = {
  disabled: false,
  error: false,
};
const propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string.isRequired,
  InputProps: PropTypes.element.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
};

const PurpleInput = withStyles({
  root: {
    '& label.Mui-focused': {
      color: purple[700],
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: purple[700],
    },
    '& label.Mui-error': {
      color: 'red',
    },
    '& .Mui-error:after': {
      borderBottomColor: 'red',
    },
  },
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
      value,
      name,
      width,
      disabled,
      error,
      helperText,
      InputProps,
      onChange,
      onKeyPress,
    } = this.props;
    return (
      <div className="mainInput">
        <PurpleInput
          label={label}
          type={type}
          value={value}
          name={name}
          style={{ width }}
          disabled={disabled}
          error={error}
          helperText={helperText}
          InputProps={InputProps}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  }
}

MainInput.defaultProps = defaultProps;
MainInput.propTypes = propTypes;

export default MainInput;
