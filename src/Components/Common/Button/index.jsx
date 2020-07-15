import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { purple } from '@material-ui/core/colors';

const defaultProps = {
  text: '',
  disabled: false,
  component: 'button',
  size: 'large',
  href: null,
  onClick: null,
};
const propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  component: PropTypes.elementType,
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  href: PropTypes.string,
  onClick: PropTypes.func,
};

const PurpleButton = withStyles((theme) => ({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    width: '150px',
    fontSize: 17,
    padding: '0 20px',
    color: theme.palette.getContrastText(purple[600]),
    backgroundColor: purple[600],
    '&:hover': {
      color: purple[600],
      border: '2px solid',
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: purple[600],
    },
    '&:active': {
      boxShadow: 'none',
    },
    '&:focus': { outline: 'none' },
  },
}))(Fab);

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { text, onClick, disabled, component, size, href } = this.props;
    return (
      <PurpleButton
        variant="extended"
        color="primary"
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
}

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;

export default Button;
