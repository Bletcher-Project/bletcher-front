import React from 'react';
import PropTypes from 'prop-types';

import BorderedButton from 'Components/Form/BorderedButton';
import colors from 'Constants/colors.scss';
import googleLogo from 'Assets/logo/google.png';

const defaultProps = {
  isSignUp: false,
};
const propTypes = {
  isSignUp: PropTypes.bool,
};

function SignGoogle(props) {
  const { isSignUp } = props;

  return (
    <BorderedButton color={colors.lightGray}>
      {isSignUp ? 'Join' : 'Sign'}
      &nbsp;in with Google
      <img
        src={googleLogo}
        alt="logo"
        style={{ width: '33px', borderRadius: '50%', marginLeft: '10px' }}
      />
    </BorderedButton>
  );
}

SignGoogle.defaultProps = defaultProps;
SignGoogle.propTypes = propTypes;

export default SignGoogle;
