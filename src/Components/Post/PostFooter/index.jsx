import React from 'react';
import PropTypes from 'prop-types';

import FundFooter from 'Components/Post/PostFooter/FundFooter';
import ShopFooter from 'Components/Post/PostFooter/ShopFooter';

const createdAtValidationCheck = (prop) => {
  const { footerOption, createdAt } = prop;
  if (
    (footerOption !== 'funding' && createdAt) ||
    (footerOption === 'funding' && !createdAt)
  ) {
    return new Error(
      'props createdAt must be use with props footerOption funding!',
    );
  }
  return null;
};

const defaultProps = {
  createdAt: '',
  footerOption: '',
  postId: null,
};

const propTypes = {
  postId: PropTypes.number,
  footerOption: PropTypes.string,
  createdAt: createdAtValidationCheck,
};

const switchFooter = (footerOption, createdAt, postId) => {
  switch (footerOption) {
    case 'funding':
      return <FundFooter postId={postId} createdAt={createdAt} />;
    case 'shop':
      return <ShopFooter />;
    default:
      return null;
  }
};

function PostFooter({ footerOption, createdAt, postId }) {
  const activeFooter = switchFooter(footerOption, createdAt, postId);
  return <div className="post__footer">{activeFooter}</div>;
}

PostFooter.propTypes = propTypes;
PostFooter.defaultProps = defaultProps;

export default PostFooter;
