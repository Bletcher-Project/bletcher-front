import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import colors from 'Constants/colors.scss';

const defaultProps = {
  secondColor: false,
  disabled: false,
  href: null,
  onClick: null,
};
const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  secondColor: PropTypes.bool,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

const useStyles = makeStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontFamily: 'GothamRound, sans-serif',
    fontSize: 15,
    padding: '0 8px',
    color: 'black',
    backgroundColor: (secondColor) =>
      secondColor ? colors.lightPurple : colors.mainColor,
    border: (secondColor) =>
      `1px solid ${secondColor ? colors.lightPurple : colors.mainColor}`,
    '&:hover': {
      color: 'red',
      backgroundColor: colors.transparent,
      border: '1px solid red',
    },
    '&:active': {
      boxShadow: 'none',
    },
    '&:focus': { outline: 'none' },
    '&.Mui-disabled': { border: 'none' },
  },
});

function DangerButton(props) {
  const { children, secondColor, disabled, href, onClick } = props;
  const classes = useStyles(secondColor);

  return (
    <Fab
      className={classes.root}
      variant="extended"
      component="button"
      disabled={disabled}
      size="small"
      style={{ width: '210px' }}
      href={href}
      onClick={onClick}
    >
      {children}
    </Fab>
  );
}

DangerButton.defaultProps = defaultProps;
DangerButton.propTypes = propTypes;

export default DangerButton;
