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

const switchFooter = (footerOption, createdAt) => {
  switch (footerOption) {
    case 'funding':
      return <FundFooter createdAt={createdAt} />;
    case 'shop':
      return <div className="footer__shop" />;
    default:
      return null;
  }
};

function PostFooter(props) {
  const { footerOption, createdAt } = props;
  const activeFooter = switchFooter(footerOption, createdAt);
  return <div className="post__footer">{activeFooter}</div>;
}

PostFooter.propTypes = propTypes;
PostFooter.defaultProps = defaultProps;

export default PostFooter;
