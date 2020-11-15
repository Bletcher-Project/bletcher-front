import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
  height: 2,
  barSize: 0.5,
};
const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number,
  barSize: PropTypes.number,
};

function ProgressBar(props) {
  const { width, height, barSize } = props;
  const styleOption = {
    width: `${width}%`,
    height: `${height}rem`,
  };
  return (
    <div className="progressBar" style={styleOption}>
      <hr className="progressBar__bar" style={{ height: `${barSize}rem` }} />
    </div>
  );
}

ProgressBar.defaultProps = defaultProps;
ProgressBar.propTypes = propTypes;

export default ProgressBar;
