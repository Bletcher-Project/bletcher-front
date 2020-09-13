import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const defaultProps = {};
const propTypes = {
  title: PropTypes.string.isRequired,
  background: PropTypes.bool.isRequired,
  position: PropTypes.oneOf([null, 'hidden', 'bottom', 'both']).isRequired,
};

function PostHeader(props) {
  const { title, background, position } = props;
  return position ? (
    <div
      className={cx('post__header', {
        fill: background,
        hidden: position === 'hidden' || position === 'both',
        bottom: position === 'bottom' || position === 'both',
      })}
    >
      <div className="post__header__title">{title}</div>
    </div>
  ) : null;
}

PostHeader.defaultProps = defaultProps;
PostHeader.propTypes = propTypes;

export default PostHeader;
