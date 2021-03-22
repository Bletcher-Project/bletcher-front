import PropTypes from 'prop-types';

const imageType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  path: PropTypes.string,
});

export default imageType;
