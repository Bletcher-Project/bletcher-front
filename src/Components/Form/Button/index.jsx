import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import colors from 'Constants/colors.scss';

const defaultProps = {
  disabled: false,
  size: 'large',
  width: '200px',
  white: false,
  href: null,
  onClick: null,
};
const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  width: PropTypes.string,
  white: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontFamily: 'GothamRound, sans-serif',
    fontSize: 17,
    padding: '0 20px',
    color: (white) =>
      white
        ? colors.mainColor
        : theme.palette.getContrastText(colors.mainColor),
    backgroundColor: (white) => (white ? colors.white : colors.mainColor),
    border: (white) => (white ? `1px solid ${colors.mainColor}` : null),
    '&:hover': {
      color: (white) => (white ? colors.white : colors.mainColor),
      backgroundColor: (white) =>
        white ? colors.mainColor : colors.transparent,
      border: `1px solid ${colors.mainColor}`,
    },
    '&:active': {
      boxShadow: 'none',
    },
    '&:focus': { outline: 'none' },
  },
}));

function Button(props) {
  const { children, disabled, size, width, white, href, onClick } = props;
  const classes = useStyles(white);

  return (
    <Fab
      className={classes.root}
      variant="extended"
      color="primary"
      component="button"
      disabled={disabled}
      size={size}
      style={{ width }}
      href={href}
      onClick={onClick}
    >
      {children}
    </Fab>
  );
}

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;

export default Button;
