import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import colors from 'Constants/colors.scss';
import fontSizes from 'Constants/font-size.scss';

const defaultProps = {
  placeholder: '',
  autoComplete: '',
  width: '200px',
  disabled: false,
  error: false,
  helperText: ' ',
  InputProps: null,
  onKeyPress: null,
};
const propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
  width: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  InputProps: PropTypes.element,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
};

const RoundedTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 0,
        borderRadius: '30px',
        boxShadow: '0 0 7px 0 rgba(89, 89, 89, 0.3)',
      },
      '&.Mui-focused fieldset': {
        boxShadow: `0 0 7px 0 ${colors.mainColor}`,
      },
      '&.Mui-error fieldset': {
        boxShadow: '0 0 5px 0 red',
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '15px 20px',
      color: colors.lightGray,
      fontSize: fontSizes.guidance,
      '&:focus': {
        color: 'black',
      },
    },
  },
})(TextField);

function RoundInput(props) {
  const {
    placeholder,
    type,
    autoComplete,
    width,
    disabled,
    error,
    helperText,
    InputProps,
    onChange,
    onKeyPress,
  } = props;

  return (
    <RoundedTextField
      variant="outlined"
      placeholder={placeholder}
      type={type}
      autoComplete={autoComplete}
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
  );
}

RoundInput.defaultProps = defaultProps;
RoundInput.propTypes = propTypes;

export default RoundInput;
