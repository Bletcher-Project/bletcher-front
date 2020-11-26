import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import photoImg from 'Assets/images/photo.svg';
import rightArrow from 'Assets/images/rightArrow.svg';

import 'bootstrap/dist/css/bootstrap.min.css';

import WOW from 'wowjs';
import cx from 'classnames';

const defaultProps = {
  height: 2,
  barSize: 0.5,
  value: 0,
  mode: 'fund',
};
const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number,
  barSize: PropTypes.number,
  value: PropTypes.number,
  mode: PropTypes.string,
};

function ProgressBar(props) {
  const [isEnd, setIsEnd] = useState(true);
  const barRef = useRef();
  useEffect(() => {
    let refCurrent = null;
    new WOW.WOW({
      live: false,
    }).init();
    if (barRef.current !== undefined) {
      refCurrent = barRef.current;
      refCurrent.addEventListener('animationend', () => {
        setIsEnd(false);
      });
    }
    return () => {
      return refCurrent
        ? refCurrent.removeEventListener('animationend', () => {
            setIsEnd(true);
          })
        : null;
    };
  });
  const { width, height, barSize, value, mode } = props;
  const styleOption = {
    width: `${width}%`,
    height: `${height}rem`,
  };
  const barStyleOption = {
    width: `${value}%`,
    height: `${barSize}rem`,
  };
  // console.log(isEnd);
  return (
    <>
      <div className="progressBar" style={styleOption}>
        <hr className="progressBar__bar" style={barStyleOption} ref={barRef} />
        {mode === 'mix' && (
          <div
            className={cx('progressBar__icon', { 'wow shake': !isEnd })}
            data-wow-iteration="infinite"
            data-wow-duration="5s"
            data-wow-delay="2s"
            style={{ opacity: isEnd ? '50%' : '100%' }}
          >
            <div className="progressBar__icon__photo">
              <img src={photoImg} alt="" />
            </div>
            <div className="progresBar__icon__arrow">
              <img src={rightArrow} alt="" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

ProgressBar.defaultProps = defaultProps;
ProgressBar.propTypes = propTypes;

export default ProgressBar;
