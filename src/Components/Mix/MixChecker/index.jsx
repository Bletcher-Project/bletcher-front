import React from 'react';
import { useSelector } from 'react-redux';

import ProgressBar from 'Components/Common/ProgressBar';

function MixChecker() {
  const mixState = useSelector((state) => state.postReducer.mixState);
  const { mixId, isMixing } = mixState;
  return (
    (isMixing || mixId) && (
      <ProgressBar width={50} height={3} barSize={0.8} value={0} />
    )
  );
}

export default MixChecker;
