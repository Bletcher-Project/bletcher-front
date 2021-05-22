import PropTypes from 'prop-types';
import imageType from 'PropTypes/image';

const userType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  introduce: PropTypes.string,
  profile_image: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  Image: imageType,
});

export default userType;
