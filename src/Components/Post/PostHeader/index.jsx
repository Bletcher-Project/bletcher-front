import React from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  background: PropTypes.bool.isRequired,
};

function PostHeader(prop) {
  const { title, background, position } = prop;
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

PostHeader.propTypes = propTypes;

export default PostHeader;
