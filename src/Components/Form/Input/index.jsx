import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import colors from 'Constants/colors.scss';
import fontSizes from 'Constants/font-size.scss';

const defaultProps = {
  placeholder: '',
  value: '',
  autoComplete: 'off',
  width: '200px',
  multiline: false,
  rows: 2,
  disabled: false,
  error: false,
  helperText: ' ',
  InputProps: null,
  onKeyPress: null,
};
const propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
  width: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
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
      color: colors.darkGray,
      fontSize: fontSizes.basic,
      fontFamily: 'GothamRound, sans-serif',
      '&:focus': {
        color: 'black',
      },
    },
    '& textarea.MuiInputBase-input': {
      padding: '5px',
    },
    '& .MuiFormHelperText-root': {
      fontFamily: 'GothamRound, sans-serif',
    },
  },
})(TextField);

function Input(props) {
  const {
    placeholder,
    value,
    type,
    autoComplete,
    width,
    multiline,
    rows,
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
      value={value || ''}
      type={type}
      autoComplete={autoComplete}
      style={{ width }}
      multiline={multiline}
      rows={rows}
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
