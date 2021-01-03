import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import NoStyleButton from 'Components/Form/NoStyleButton';
import MixComplete from 'Components/Mix/MixComplete';
import Bar from 'Components/Common/Bar';

import progressText from 'Constants/progressbar-text';
import photoImg from 'Assets/images/photo.svg';
import rightArrow from 'Assets/images/rightArrow.svg';

import 'bootstrap/dist/css/bootstrap.min.css';

import WOW from 'wowjs';
import cx from 'classnames';
import { Modal } from 'reactstrap';

const defaultProps = {
  height: 2,
  barSize: 0.5,
  value: 0,
  isMixing: true,
};
const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number,
  barSize: PropTypes.number,
  value: PropTypes.number,
  isMixing: PropTypes.bool,
};

function ProgressBar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const barRef = useRef();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    let refCurrent = null;
    new WOW.WOW({
      live: false,
    }).init();
    if (barRef.current !== undefined) {
      refCurrent = barRef.current;
      refCurrent.addEventListener('animationiteration', () => {
        if (index === 5) setIndex(0);
        else setIndex(index + 1);
      });
    }
    return () => {
      return (
        refCurrent && refCurrent.removeEventListener('animationiteration', null)
      );
    };
  });
  const { width, height, barSize, value, isMixing } = props;
  return (
    <div className="container">
      <div className="pgText">{progressText[index]}</div>
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
            if (!isMixing) setIsOpen(true);
          }}
        >
          <div
            className={cx('progressBar__icon', { 'wow shake': !isMixing })}
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
