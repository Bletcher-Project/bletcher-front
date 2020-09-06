import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const defaultProps = {
  position: null,
};
const propTypes = {
  title: PropTypes.string.isRequired,
  background: PropTypes.bool.isRequired,
  position: PropTypes.oneOf([null, 'hidden']),
};

function PostHeader(props) {
  const { title, background, position } = props;
  return (
    <div
      className={cx('post__header', {
        fill: background,
        hidden: position === 'hidden',
      })}
    >
      <div className="post__header__title">{title}</div>
    </div>
  );
}

PostHeader.defaultProps = defaultProps;
PostHeader.propTypes = propTypes;

export default PostHeader;
