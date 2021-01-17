import React, { useState } from 'react';
import { userType } from 'PropTypes';

import UploadImgFile from 'Components/Upload/UploadImgFile';
import Thumbnail from 'Components/Thumbnail';
import Input from 'Components/Form/Input';

const defaultProps = { user: null };
const propTypes = { user: userType };

function Profile(props) {
  const { user } = props;
  const [image, setImage] = useState({
    preview: user && user.profile_image,
    raw: null,
  });

  const handleUploadImg = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleChange = () => {
    // TODO: 다음 PR에서 구현 예정
  };

  return (
    <div className="profile">
      <div className="profile__form">
        <div className="profile__form-photo">
          <UploadImgFile handleUploadImg={handleUploadImg}>
            <Thumbnail src={image.preview} userName={user && user.nickname} />
          </UploadImgFile>
        </div>
        <p className="profile__form-desc">
          Bletcher users will be able to identify you with the information
          below.
        </p>
        <Input
          placeholder="User Name"
          type="text"
          autoComplete="username"
          width="100%"
          onChange={handleChange}
        />
        <Input
          placeholder="Website"
          type="text"
          autoComplete="url"
          width="100%"
          onChange={handleChange}
        />
        <Input
          placeholder="Short Introduce"
          type="text"
          width="100%"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

Profile.defaultProps = defaultProps;
Profile.propTypes = propTypes;

export default Profile;
