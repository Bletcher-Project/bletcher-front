import React from 'react';
import PropTypes from 'prop-types';

import FundFooter from 'Components/Post/PostFooter/FundFooter';

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
};

const propTypes = {
  footerOption: PropTypes.string,
  createdAt: createdAtValidationCheck,
};

function PostFooter(prop) {
  const { footerOption, createdAt } = prop;
  return (
    <div className="post__footer">
      {footerOption === 'funding' ? <FundFooter createdAt={createdAt} /> : null}
    </div>
  );
}

PostFooter.propTypes = propTypes;
PostFooter.defaultProps = defaultProps;

export default PostFooter;
