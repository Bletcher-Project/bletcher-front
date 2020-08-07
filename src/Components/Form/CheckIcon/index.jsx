import React from 'react';

import Fade from '@material-ui/core/Fade';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import colors from 'Constants/colors.scss';

function CheckIcon() {
  return (
    <Fade in timeout={350}>
      <CheckCircleOutlineIcon
        style={{ color: colors.mainColor, width: '0.8em' }}
      />
    </Fade>
  );
}

export default CheckIcon;
