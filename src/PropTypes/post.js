import PropTypes from 'prop-types';

export const basicType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  is_public: PropTypes.oneOf([0, 1, true, false]).isRequired,
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
});

export const mainPost = PropTypes.arrayOf(
  PropTypes.shape({
    post: basicType,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
);

export const favoritePost = PropTypes.arrayOf(basicType.isRequired);
export const fundingPost = PropTypes.arrayOf(basicType.isRequired);
