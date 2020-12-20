import PropTypes from 'prop-types';

const postType = PropTypes.arrayOf(
  PropTypes.shape({
    post: PropTypes.shape({
      id: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      is_public: PropTypes.bool.isRequired,
      Category: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
      Image: PropTypes.shape({
        id: PropTypes.number.isRequired,
        path: PropTypes.string,
      }),
      User: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nickname: PropTypes.string.isRequired,
      }),
    }),
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
);

export default postType;
