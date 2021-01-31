import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { increasePbIndex } from 'Redux/post';

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
  const mixState = useSelector((state) => state.postReducer.mixState);
  const { progressIndex, isMixing, mixId } = mixState;

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);

  const isMixEnd = () => {
    return !isMixing && mixId;
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const refreshToRoot = () => {
    window.location.replace('/');
  };

  const getText = () => {
    if (!isMixing && mixId) {
      return pgBarCompleteText;
    }
    if (mixId === 0) {
      if (!error) setError(true);
      return (
        <>
          <span>{pgBarErrorText}</span>
          <NoStyleButton onClick={refreshToRoot}>
            <div className="refresh">
              <img src={refresh} alt="refresh" />
            </div>
          </NoStyleButton>
        </>
      );
    }
    return pgBarText[progressIndex];
  };

  useEffect(() => {
    setInterval(() => {
      dispatch(increasePbIndex());
    }, 30000);
  });

  return (
    <div className="container">
      <div className="pgText">{getText()}</div>
      <Progress
        animated
        value={100}
        style={{ backgroundColor: colors.mainColor }}
      />
      {isMixEnd() && (
        <NoStyleButton
          onClick={() => {
            if (isMixEnd()) setIsOpen(true);
          }}
        >
          <div className="mixProgress__icon">
            <div className="mixProgress__icon__photo">
              <img src={photoImg} alt="photoicon" />
            </div>
            <div className="mixProgress__icon__arrow">
              <img src={rightArrow} alt="right" />
            </div>
          </div>
        </NoStyleButton>
      )}
      <Modal isOpen={isOpen} toggle={toggle}>
        <MixComplete />
      </Modal>
    </div>
  );
}

MixProgress.defaultProps = defaultProps;
MixProgress.propTypes = propTypes;

export default MixProgress;
