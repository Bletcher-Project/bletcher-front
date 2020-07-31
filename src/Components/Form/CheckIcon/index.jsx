import React from 'react';

import Fade from '@material-ui/core/Fade';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { purple } from '@material-ui/core/colors';

function CheckIcon() {
  return (
    <Fade in timeout={350}>
      <CheckCircleOutlineIcon style={{ color: purple[700], width: '0.8em' }} />
    </Fade>
  );
}

export default CheckIcon;
