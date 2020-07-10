import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

const defaultProps = {
  placeholder: '',
};
const propTypes = {
  placeholder: PropTypes.string,
  width: PropTypes.number.isRequired,
  icon: PropTypes.element.isRequired,
  rowsMax: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
};

const PurpleTextField = withStyles({
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

class MainTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      placeholder,
      width,
      icon,
      rowsMax,
      onClick,
      onKeyPress,
    } = this.props;
    return (
      <div className="mainTextField">
        <PurpleTextField
          placeholder={placeholder}
          style={{ width }}
          multiline
          rowsMax={rowsMax || 4}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                className="mainTextField__icon"
                onClick={onClick}
              >
                {icon}
              </InputAdornment>
            ),
          }}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  }
}

MainTextField.defaultProps = defaultProps;
MainTextField.propTypes = propTypes;

export default MainTextField;
