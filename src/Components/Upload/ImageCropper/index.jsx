import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import NoStyleButton from 'Components/Form/NoStyleButton';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import Button from '@material-ui/core/Button';

function ImageCropper(props) {
  const { imgHandler } = props;
  const cropperRef = useRef(null);
  const user = useSelector((state) => state.authReducer.user);

  const [pictureImg, setPictureImg] = useState(null);
  const [pictureImgUrl, setPictureImgUrl] = useState(null);

  const handlePictureImg = async (e) => {
    if (e.target.files[0] !== undefined) {
      setPictureImg(e.target.files[0]);
      setPictureImgUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePostUpload = useCallback(async () => {
    if (user && cropperRef.current) {
      const imgElement = cropperRef.current;
      const { cropper } = imgElement;
      if (pictureImg && cropper) {
        const { name } = pictureImg;
        const canvas = cropper.getCroppedCanvas();
        if (canvas) {
          canvas.toBlob(
            async (croppedImg) => {
              const image = new FormData();
              image.append('img', croppedImg, name);
              imgHandler(image);
            },
            undefined,
            1,
          );
        }
      } else {
        // TO DO :: notify uploading image !
      }
    } else {
      // TO DO :: implement login modal !
    }
  }, [imgHandler, pictureImgUrl, user, pictureImg]);

  const removePicture = () => {
    setPictureImg(null);
    setPictureImgUrl(null);
  };

  useEffect(() => {
    handlePostUpload();
  }, [pictureImg, handlePostUpload]);

  return (
    <>
      <div className="imageCropper">
        <div className="imageCropper__creator">
          <div className="imageCropper__creator-previewPic">
            {pictureImg && (
              <>
                <Cropper
                  className="cropper"
                  alt="imageCrop"
                  style={{ zIndex: 2 }}
                  src={pictureImgUrl}
                  ref={cropperRef}
                  crop={handlePostUpload}
                />
                <NoStyleButton
                  className="imageCropper__creator-previewPic__remove"
                  onClick={removePicture}
                >
                  X
                </NoStyleButton>
              </>
            )}
            {!pictureImg && (
              <div className="imageCropper__creator-previewPic__empty">
                <div className="imageCropper__creator-previewPic__empty-uploadPic">
                  <Button
                    size="small"
                    fullWidth
                    disableRipple
                    disableFocusRipple
                  >
                    <label htmlFor="art-upload">
                      upload image
                      <input
                        accept="image/*"
                        type="file"
                        name="img"
                        id="art-upload"
                        style={{ display: 'none' }}
                        onChange={handlePictureImg}
                      />
                    </label>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

ImageCropper.propTypes = {
  imgHandler: PropTypes.func.isRequired,
};

export default ImageCropper;
