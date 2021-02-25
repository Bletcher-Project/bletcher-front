import React from 'react';
import { useSelector } from 'react-redux';

import MixProgress from 'Components/Mix/MixProgress';

function MixChecker() {
  const mixState = useSelector((state) => state.postReducer.mixState);
  const { mixId, isMixing } = mixState;
  const toRtn = () => {
    if (isMixing || mixId)
      return <MixProgress width={50} height={3} barSize={0.8} value={0} />;
    return <div />;
  };

  return toRtn();
}

export default MixChecker;
