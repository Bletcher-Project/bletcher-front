import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { updateUser, setLoadingState } from 'Redux/auth';

import UploadImgFile from 'Components/Upload/UploadImgFile';
import Thumbnail from 'Components/Thumbnail';
import Input from 'Components/Form/Input';
import Button from 'Components/Form/Button';
import RoundLoader from 'Components/Loader/Round';
import CheckPassword from 'Components/Profile/Contents/CheckPassword';

import { DEFAULT_HELPER_TEXT, PasswordHelperText } from 'Constants/helper-text';

import deleteX from 'Assets/images/delete-x.svg';

import {
  checkEmailValidation,
  checkNameValidation,
  checkPasswordValidation,
} from 'Utils/validation';

function Profile() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const user = useSelector((state) => state.authReducer.user);
  const authLoading = useSelector((state) => state.authReducer.loading);

  const [authChecked, setAuthChecked] = useState(false);
  const [image, setImage] = useState({
    preview: user && user.Image && user.Image.path,
    raw: null,
  });
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [introduce, setIntroduce] = useState();
  const [password, setPassword] = useState({ raw: '', confirm: '' });

  const [isValid, setIsValid] = useState({
    name: true,
    email: true,
    password: true,
  });

  const [isDeleted, setIsDeleted] = useState(false);

  const [helperText, setHelperText] = useState({
    name: DEFAULT_HELPER_TEXT,
    email: DEFAULT_HELPER_TEXT,
    password: DEFAULT_HELPER_TEXT,
  });

  useEffect(() => {
    setName(user && user.nickname);
    setEmail(user && user.email);
    setIntroduce(user && user.introduce);
  }, [user]);

  const handleAuthCheck = () => {
    setAuthChecked(true);
  };

  const handleUploadImg = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      setIsDeleted(false);
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

  const checkValidation = async () => {
    let pwdCheck = { isValid: true, helperText: DEFAULT_HELPER_TEXT };
    let emCheck = { isValid: true, helperText: DEFAULT_HELPER_TEXT };
    let nmCheck = { isValid: true, helperText: DEFAULT_HELPER_TEXT };

    if (password.raw !== password.confirm) {
      pwdCheck.isValid = false;
      pwdCheck.helperText = PasswordHelperText.MISS_MATCH_PW;
    } else if (password.raw.length > 0 || password.confirm.length > 0) {
      pwdCheck = checkPasswordValidation(password.raw);
    }
    if (email !== user.email) emCheck = await checkEmailValidation(email);
    if (name !== user.nickname) nmCheck = await checkNameValidation(name);

    setIsValid({
      name: nmCheck.isValid,
      email: emCheck.isValid,
      password: pwdCheck.isValid,
    });
    setHelperText({
      name: nmCheck.helperText,
      email: emCheck.helperText,
      password: pwdCheck.helperText,
    });

    return pwdCheck.isValid && emCheck.isValid && nmCheck.isValid;
  };

  const updateProfile = async () => {
    let updateData = { password: password.raw };
    if (email !== user.email) updateData = { ...updateData, email };
    if (name !== user.nickname) updateData = { ...updateData, name };
    if (introduce !== user.introduce) updateData = { ...updateData, introduce };
    if (isDeleted) {
      updateData = { ...updateData, profileImgDeleteFlag: true };
    } else if (image.raw) updateData = { ...updateData, img: image.raw };
    await dispatch(updateUser(token, updateData));
  };

  const handleSaveChanges = async () => {
    dispatch(setLoadingState(true));
    const result = await checkValidation();
    if (!result) {
      dispatch(setLoadingState(false));
      return;
    }
    await updateProfile();
    dispatch(setLoadingState(false));
  };

  const initChanges = () => {
    setImage({ preview: user && user.Image && user.Image.path, raw: null });
    setName(user && user.nickname);
    setEmail(user && user.email);
    setIntroduce(user && user.introduce);
    setPassword({ raw: '', confirm: '' });
    setIsValid({ name: true, email: true, password: true });
    setIsDeleted(false);
    setHelperText({
      name: DEFAULT_HELPER_TEXT,
      email: DEFAULT_HELPER_TEXT,
      password: DEFAULT_HELPER_TEXT,
    });
  };

  return (
    <div className="profile">
      {authLoading && <RoundLoader />}
      {!authChecked ? (
        <div className="profile__check">
          <h2>Please enter your existing password.</h2>
          <CheckPassword handleAuthCheck={handleAuthCheck} />
        </div>
      ) : (
        <div className="profile__form">
          <div className="profile__form-photo">
            <UploadImgFile handleUploadImg={handleUploadImg}>
              <>
                <Thumbnail
                  src={isDeleted ? null : image.preview}
                  userName={user && user.nickname}
                />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleted(true);
                  }}
                  className="profile__form-photo__deleteButton"
                >
                  <img src={deleteX} alt="del" />
                </button>
              </>
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
              error={!isValid.name}
              helperText={helperText.name}
              onChange={(e) => handleChangeName(e)}
            />
            <Input
              placeholder="Email"
              value={email}
              type="text"
              autoComplete="email"
              width="100%"
              error={!isValid.email}
              helperText={helperText.email}
              onChange={(e) => handleChangeEmail(e)}
            />
            <div className="profile__form__inputs-div">
              <Input
                placeholder="Password"
                value={password.raw}
                type="password"
                autoComplete="password"
                width="49%"
                error={!isValid.password}
                helperText={helperText.password}
                onChange={(e) => handleChangePassword(e)}
              />
              <Input
                placeholder="Re-Password"
                value={password.confirm}
                type="password"
                autoComplete="password"
                width="49%"
                error={!isValid.password}
                helperText={helperText.password}
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
            <Button size="small" width="80px" onClick={handleSaveChanges}>
              save
            </Button>
            <Button size="small" width="80px" white onClick={initChanges}>
              cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
