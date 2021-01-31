import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import colors from 'Constants/colors.scss';

const defaultProps = {};
const propTypes = {
  label: PropTypes.string.isRequired,
};

const CustomFormControlLabel = withStyles({
  root: {
    '& .MuiCheckbox-root': {
      color: colors.lightGray,
    },
    '& .Mui-checked': {
      color: colors.mainColor,
    },
    '& .MuiSvgIcon-root': {
      transform: 'scale(1.5)',
    },
    '& .MuiFormControlLabel-label': {
      fontFamily: 'GothamRound, sans-serif',
      fontSize: '1.2rem',
    },
  },
})(FormControlLabel);

function CheckBox(props) {
  const { label } = props;

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <CustomFormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
          name="checked"
          color="default"
        />
      }
      label={label}
    />
  );
}

CheckBox.defaultProps = defaultProps;
CheckBox.propTypes = propTypes;

export default CheckBox;
