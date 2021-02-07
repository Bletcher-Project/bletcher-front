import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { initializeMixState } from 'Redux/post';

import NoStyleButton from 'Components/Form/NoStyleButton';
import MixComplete from 'Components/Mix/MixComplete';

import {
  pgBarText,
  pgBarCompleteText,
  pgBarErrorText,
} from 'Constants/progressbar-text';
import colors from 'Constants/colors.scss';

import photoImg from 'Assets/images/photo.svg';
import rightArrow from 'Assets/images/rightArrow.svg';
import refresh from 'Assets/images/refresh.svg';

import { Modal, Progress } from 'reactstrap';

const defaultProps = {};
const propTypes = {};

function MixProgress() {
  const dispatch = useDispatch();
  const mixState = useSelector((state) => state.postReducer.mixState);
  const { progressIndex, isMixing, mixId } = mixState;
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);

  const isMixEnd = () => {
    return !isMixing && mixId;
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const refreshMix = () => {
    dispatch(initializeMixState());
  };

  const getImageDiv = (className, src) => {
    return (
      <div className={className}>
        <img src={src} alt={className} />
      </div>
    );
  };

  const getText = () => {
    if (isMixEnd()) {
      return (
        <>
          <span>{pgBarCompleteText}</span>
          <NoStyleButton onClick={() => setIsOpen(true)}>
            <div className="pgStatus__icon">
              {getImageDiv('pgStatus__icon__photo', photoImg)}
              {getImageDiv('pgStatus__icon__arrow', rightArrow)}
            </div>
          </NoStyleButton>
        </>
      );
    }
    if (mixId === 0) {
      if (!error) setError(true);
      return (
        <>
          <span>{pgBarErrorText}</span>
          <NoStyleButton onClick={refreshMix}>
            {getImageDiv('refresh', refresh)}
          </NoStyleButton>
        </>
      );
    }

    return (
      <>
        <span>{pgBarText[progressIndex]}</span>
        <NoStyleButton className="cancelBtn" onClick={refreshMix}>
          cancel
        </NoStyleButton>
      </>
    );
  };

  const getProgressBar = () => {
    const style = { backgroundColor: colors.mainColor };
    if (error || isMixEnd())
      return <Progress striped value={100} style={style} />;

    return <Progress animated value={100} style={style} />;
  };

  return (
    <div className="container">
      <div className="pgStatus">{getText()}</div>
      {getProgressBar()}
      <Modal isOpen={isOpen} toggle={toggle}>
        <MixComplete toggle={toggle} />
      </Modal>
    </div>
  );
}

MixProgress.defaultProps = defaultProps;
MixProgress.propTypes = propTypes;

export default MixProgress;
