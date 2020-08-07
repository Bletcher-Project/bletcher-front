import React from 'react';

import BorderedButton from 'Components/Form/BorderedButton';
import colors from 'Constants/colors.scss';
import googleLogo from 'Assets/logo/google.png';

function SignUpGoogle() {
  return (
    <BorderedButton color={colors.lightGray}>
      <span>Join in with Google</span>
      <img
        src={googleLogo}
        alt="logo"
        style={{ width: '33px', borderRadius: '50%', marginLeft: '10px' }}
      />
    </BorderedButton>
  );
}

export default SignUpGoogle;
