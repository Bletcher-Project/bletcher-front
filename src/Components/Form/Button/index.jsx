import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
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

const PurpleButton = withStyles((theme) => ({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 17,
    padding: '0 20px',
    color: theme.palette.getContrastText(colors.mainColor),
    backgroundColor: colors.mainColor,
    '&:hover': {
      color: colors.mainColor,
      border: '2px solid',
      backgroundColor: colors.transparent,
      borderColor: colors.mainColor,
    },
    '&:active': {
      boxShadow: 'none',
    },
    '&:focus': { outline: 'none' },
  },
}))(Fab);

function Button(props) {
  const { text, onClick, disabled, component, size, width, href } = props;

  return (
    <PurpleButton
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
    </PurpleButton>
  );
}

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;

export default Button;
