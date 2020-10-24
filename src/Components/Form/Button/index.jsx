import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import colors from 'Constants/colors.scss';

const defaultProps = {
  text: '',
  disabled: false,
  component: 'button',
  size: 'large',
  width: '200px',
  href: null,
  onClick: null,
};
const propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  component: PropTypes.elementType,
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  width: PropTypes.string,
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
    color: (props) =>
      props.white
        ? colors.mainColor
        : theme.palette.getContrastText(colors.mainColor),
    backgroundColor: (props) => (props.white ? colors.white : colors.mainColor),
    border: (props) => (props.white ? `1px solid ${colors.mainColor}` : null),
    '&:hover': {
      color: (props) => (props.white ? colors.white : colors.mainColor),
      backgroundColor: (props) =>
        props.white ? colors.mainColor : colors.transparent,
      border: `2px solid ${colors.mainColor}`,
    },
    '&:active': {
      boxShadow: 'none',
    },
    '&:focus': { outline: 'none' },
  },
}));

function Button(props) {
  const classes = useStyles(props);
  const { text, onClick, disabled, component, size, width, href } = props;

  return (
    <Fab
      className={classes.root}
      variant="extended"
      color="primary"
      style={{ width }}
      size={size}
      disabled={disabled}
      onClick={onClick}
      component={component}
      href={href}
    >
      {text}
    </Fab>
  );
}

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;

export default Button;
