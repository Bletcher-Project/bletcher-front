import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
  posts: null,
};

const propTypes = {
  posts: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

function PostList(props) {
  const { posts } = props;
  return <div className="postList">{posts}</div>;
}

PostList.propTypes = propTypes;
PostList.defaultProps = defaultProps;

export default PostList;
