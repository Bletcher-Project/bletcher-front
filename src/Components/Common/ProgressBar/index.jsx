import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { increasePbIndex } from 'Redux/post';

import NoStyleButton from 'Components/Form/NoStyleButton';
import MixComplete from 'Components/Mix/MixComplete';
import Bar from 'Components/Common/Bar';

import {
  pgBarText,
  pgBarCompleteText,
  pgBarErrorText,
} from 'Constants/progressbar-text';
import photoImg from 'Assets/images/photo.svg';
import rightArrow from 'Assets/images/rightArrow.svg';
import refresh from 'Assets/images/refresh.svg';

import 'bootstrap/dist/css/bootstrap.min.css';

import WOW from 'wowjs';
import cx from 'classnames';
import { Modal } from 'reactstrap';

const defaultProps = {
  height: 2,
  barSize: 0.5,
  value: 0,
};
const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number,
  barSize: PropTypes.number,
  value: PropTypes.number,
};

function ProgressBar(props) {
  const { width, height, barSize, value } = props;
  const mixState = useSelector((state) => state.postReducer.mixState);
  const { progressIndex, isMixing, mixId } = mixState;

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const barRef = useRef();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const refreshToRoot = () => {
    window.location.replace('/');
  };

  const stopAnimationIterate = () => {
    if (barRef.current !== undefined)
      barRef.current.style.animationIterationCount = 1;
  };

  const getText = () => {
    if (!isMixing && mixId) {
      stopAnimationIterate();
      return pgBarCompleteText;
    }
    if (mixId === 0) {
      if (!error) setError(true);
      stopAnimationIterate();
      return pgBarErrorText;
    }
    return pgBarText[progressIndex];
  };

  useEffect(() => {
    new WOW.WOW({
      live: false,
    }).init();
  }, []);

  useEffect(() => {
    let refCurrent = null;
    if (barRef.current !== undefined) {
      refCurrent = barRef.current;
      refCurrent.addEventListener('animationiteration', () => {
        dispatch(increasePbIndex());
      });
    }
    return () => {
      return (
        refCurrent && refCurrent.removeEventListener('animationiteration', null)
      );
    };
  }, [progressIndex, dispatch]);

  return (
    <div className="container">
      <div className="pgText">
        {getText()}
        {error && (
          <NoStyleButton onClick={refreshToRoot}>
            <img src={refresh} alt="refresh" />
          </NoStyleButton>
        )}
      </div>
      <Bar
        barRef={barRef}
        value={value}
        width={width}
        height={height}
        barSize={barSize}
        className="progressBar"
      >
        <NoStyleButton
          onClick={() => {
            if (!isMixing && mixId) setIsOpen(true);
          }}
        >
          <div
            className={cx('progressBar__icon', {
              'wow shake': !isMixing && mixId,
            })}
            data-wow-iteration="infinite"
            data-wow-duration="5s"
            data-wow-delay="2s"
            style={{ opacity: isMixing ? '50%' : '100%' }}
          >
            <div className="progressBar__icon__photo">
              <img src={photoImg} alt="" />
            </div>
            <div className="progresBar__icon__arrow">
              <img src={rightArrow} alt="" />
            </div>
          </div>
        </NoStyleButton>
      </Bar>
      <Modal isOpen={isOpen} toggle={toggle}>
        <MixComplete />
      </Modal>
    </div>
  );
}

ProgressBar.defaultProps = defaultProps;
ProgressBar.propTypes = propTypes;

export default ProgressBar;
