import PropTypes from 'prop-types';

const userType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  introduce: PropTypes.string,
  profile_image: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
});

export default userType;
