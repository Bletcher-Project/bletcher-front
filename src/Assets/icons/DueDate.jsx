import React from 'react';

import PropTypes from 'prop-types';

import dueDateImgBgRemoved from 'Assets/images/fundDueDate-bg-removed.png';
import dueDateImgBgFill from 'Assets/images/fundDueDate-bg-fill.png';

const defaultProps = {
  fill: false,
};

const propTypes = {
  fill: PropTypes.bool,
};

function DueDate(props) {
  const { fill } = props;
  const imgSrc = fill ? dueDateImgBgFill : dueDateImgBgRemoved;
  const classname = fill ? 'dueDate' : 'dueDateIcon';
  return <img src={imgSrc} alt="dueDate" className={classname} />;
}

DueDate.defaultProps = defaultProps;
DueDate.propTypes = propTypes;

export default DueDate;
