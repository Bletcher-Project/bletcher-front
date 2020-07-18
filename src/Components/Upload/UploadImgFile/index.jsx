import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.element.isRequired,
  handleUploadImg: PropTypes.func.isRequired,
};

function UploadImgFile(props) {
  const { children, handleUploadImg } = props;

  return (
    <>
      <label htmlFor="image-upload">
        <input
          accept="image/*"
          type="file"
          name="image"
          id="image-upload"
          style={{ display: 'none' }}
          onChange={handleUploadImg}
        />
        {children}
      </label>
    </>
  );
}

UploadImgFile.propTypes = propTypes;

export default UploadImgFile;
