import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import colors from 'Constants/colors.scss';
import fontSizes from 'Constants/font-size.scss';

const defaultProps = {
  size: 'large',
  onClick: null,
};
const propTypes = {
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  onClick: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

const useStyles = makeStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: fontSizes.guidance,
    fontWeight: 600,
    color: (props) => props.color,
    backgroundColor: colors.transparent,
    border: (props) => `2px solid ${props.color}`,
    padding: 0,
    '& .MuiFab-label': {
      justifyContent: 'space-between',
      padding: '0 5px 0 15px',
    },
    '&:hover': {
      backgroundColor: colors.transparent,
    },
    '&:active': {
      boxShadow: 'none',
    },
    '&:focus': { outline: 'none' },
  },
});

function BorderedButton(props) {
  const classes = useStyles(props);
  const { size, onClick, children } = props;

  return (
    <Fab
      className={classes.root}
      variant="extended"
      size={size}
      onClick={onClick}
    >
      {children}
    </Fab>
  );
}

BorderedButton.defaultProps = defaultProps;
BorderedButton.propTypes = propTypes;

export default BorderedButton;
