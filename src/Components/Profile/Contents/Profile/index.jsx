import React, { useState, useEffect } from 'react';
import { userType } from 'PropTypes';

import { useSelector, useDispatch } from 'react-redux';
import { updateUser, setLoadingState } from 'Redux/auth';

import UploadImgFile from 'Components/Upload/UploadImgFile';
import Thumbnail from 'Components/Thumbnail';
import Input from 'Components/Form/Input';
import Button from 'Components/Form/Button';
import RoundLoader from 'Components/Loader/Round';

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

  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const authLoading = useSelector((state) => state.authReducer.loading);

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

  const updateProfile = async () => {
    if (password.raw.length > 0 && password.raw === password.confirm) {
      let updateData = { password: password.raw };
      if (email !== user.email) updateData = { ...updateData, email };
      if (name !== user.nickname) updateData = { ...updateData, name };
      if (introduce !== user.introduce)
        updateData = { ...updateData, introduce };
      if (image.raw) updateData = { ...updateData, img: image.raw };

      dispatch(setLoadingState(true));
      await dispatch(updateUser(token, updateData));
      dispatch(setLoadingState(false));
    } else {
      // TODO: Password Input Component error & helptext
      alert('Password를 입력하세요.');
    }
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
      {authLoading && <RoundLoader />}
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
        <form className="profile__form__inputs">
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
          <div className="profile__form__inputs-div">
            <Input
              placeholder="Password"
              value={password.raw}
              type="password"
              autoComplete="password"
              width="49%"
              onChange={(e) => handleChangePassword(e)}
            />
            <Input
              placeholder="Re-Password"
              value={password.confirm}
              type="password"
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
            multiline
            onChange={(e) => handleChangeIntroduce(e)}
          />
        </form>

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
