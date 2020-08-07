import React from 'react';

import BorderedButton from 'Components/Form/BorderedButton';
import colors from 'Constants/colors.scss';
import facebookLogo from 'Assets/logo/facebook.png';

function SignUpFacebook() {
  return (
    <BorderedButton color={colors.facebookBlue}>
      <span>Join in with Facebook</span>
      <img
        src={facebookLogo}
        alt="logo"
        style={{ width: '35px', borderRadius: '50%', marginLeft: '5px' }}
      />
    </BorderedButton>
  );
}

export default SignUpFacebook;
