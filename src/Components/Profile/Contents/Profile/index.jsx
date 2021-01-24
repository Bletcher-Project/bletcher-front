import React, { useState, useEffect } from 'react';
import { userType } from 'PropTypes';

import UploadImgFile from 'Components/Upload/UploadImgFile';
import Thumbnail from 'Components/Thumbnail';
import Input from 'Components/Form/Input';
import Button from 'Components/Form/Button';

const defaultProps = { user: null };
const propTypes = { user: userType };

function Profile(props) {
  const { user } = props;
  const [image, setImage] = useState({
    preview: user && user.profile_image,
    raw: null,
  });
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [introduce, setIntroduce] = useState();
  const [password, setPassword] = useState({ raw: '', confirm: '' });

  useEffect(() => {
    setName(user && user.nickname);
    setEmail(user && user.email);
    setIntroduce(user && user.introduce);
  }, [user]);

  const handleUploadImg = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeIntroduce = (e) => {
    setIntroduce(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword({ ...password, raw: e.target.value });
  };

  const handleChangeRePassword = (e) => {
    setPassword({ ...password, confirm: e.target.value });
  };

  const updateProfile = () => {
    // TODO: update Profile
  };

  const initChanges = () => {
    setImage({ preview: user && user.profile_image, raw: null });
    setName(user && user.nickname);
    setEmail(user && user.email);
    setIntroduce(user && user.introduce);
    setPassword({ raw: '', confirm: '' });
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
          value={name}
          type="text"
          autoComplete="username"
          width="100%"
          onChange={(e) => handleChangeName(e)}
        />
        <Input
          placeholder="Email"
          value={email}
          type="text"
          autoComplete="email"
          width="100%"
          onChange={(e) => handleChangeEmail(e)}
        />
        <div className="profile__form-div">
          <Input
            placeholder="Password"
            value={password.raw}
            type="text"
            autoComplete="password"
            width="49%"
            onChange={(e) => handleChangePassword(e)}
          />
          <Input
            placeholder="Re-Password"
            value={password.confirm}
            type="text"
            autoComplete="password"
            width="49%"
            onChange={(e) => handleChangeRePassword(e)}
          />
        </div>
        <Input
          placeholder="Short Introduce"
          value={introduce}
          type="text"
          width="100%"
          onChange={(e) => handleChangeIntroduce(e)}
        />
        <div className="profile__form-submit">
          <Button size="small" width="80px" onClick={updateProfile}>
            save
          </Button>
          <Button size="small" width="80px" white onClick={initChanges}>
            cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

Profile.defaultProps = defaultProps;
Profile.propTypes = propTypes;

export default Profile;
