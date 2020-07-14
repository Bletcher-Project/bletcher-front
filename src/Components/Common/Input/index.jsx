import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

const defaultProps = {
  label: '',
  width: '200px',
  disabled: false,
  error: false,
  helperText: '',
  InputProps: null,
  onKeyPress: null,
};
const propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  width: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  InputProps: PropTypes.element,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
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

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      label,
      type,
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
          style={{ width }}
          disabled={disabled}
          error={error}
          helperText={helperText}
          InputProps={{
            endAdornment: InputProps,
          }}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  }
}

Input.defaultProps = defaultProps;
Input.propTypes = propTypes;

export default Input;
