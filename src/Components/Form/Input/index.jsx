import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import colors from 'Constants/colors.scss';
import fontSizes from 'Constants/font-size.scss';

const defaultProps = {
  placeholder: '',
  autoComplete: 'off',
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

const CustomTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      fontFamily: 'GothamRound, sans-serif',
      '& fieldset': {
        border: `1px solid ${colors.lightGray}`,
        borderRadius: '30px',
      },
      '&.Mui-focused fieldset': {
        border: `1px solid ${colors.darkGray}`,
      },
      '&.Mui-error fieldset': {
        border: `1px solid red`,
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '14px 18px',
      color: colors.lightGray,
      fontSize: fontSizes.basic,
      fontFamily: 'GothamRound, sans-serif',
      '&:focus': {
        color: 'black',
      },
    },
    '& .MuiFormHelperText-root': {
      fontFamily: 'GothamRound, sans-serif',
    },
  },
})(TextField);

function Input(props) {
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
    <CustomTextField
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

Input.defaultProps = defaultProps;
Input.propTypes = propTypes;

export default Input;
