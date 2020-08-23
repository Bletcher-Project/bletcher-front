import React from 'react';
import PropTypes from 'prop-types';

import BorderedButton from 'Components/Form/BorderedButton';
import colors from 'Constants/colors.scss';
import facebookLogo from 'Assets/logo/facebook.png';

const defaultProps = {
  isSignUp: false,
};
const propTypes = {
  isSignUp: PropTypes.bool,
};

function SignFacebook(props) {
  const { isSignUp } = props;

  return (
    <BorderedButton color={colors.facebookBlue}>
      {isSignUp ? 'Join' : 'Sign'}
      &nbsp;in with Facebook
      <img
        src={facebookLogo}
        alt="logo"
        style={{ width: '35px', borderRadius: '50%', marginLeft: '5px' }}
      />
    </BorderedButton>
  );
}

SignFacebook.defaultProps = defaultProps;
SignFacebook.propTypes = propTypes;

export default SignFacebook;
