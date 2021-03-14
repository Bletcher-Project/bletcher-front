import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { checkPassword, setLoadingState } from 'Redux/auth';

import Input from 'Components/Form/Input';
import Button from 'Components/Form/Button';
import RoundLoader from 'Components/Loader/Round';

import { DEFAULT_HELPER_TEXT, PasswordHelperText } from 'Constants/helper-text';

const propTypes = {
  handleAuthCheck: PropTypes.func.isRequired,
};

function CheckPassword(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const authLoading = useSelector((state) => state.authReducer.loading);

  const [password, setPassword] = useState();
  const [isValid, setIsValid] = useState(true);
  const [helperText, setHelperText] = useState(DEFAULT_HELPER_TEXT);

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setIsValid(true);
    setHelperText(DEFAULT_HELPER_TEXT);
  };

  const handleCheckPassword = async () => {
    const { handleAuthCheck } = props;
    dispatch(setLoadingState(true));
    if (await dispatch(checkPassword(token, password))) {
      handleAuthCheck();
    } else {
      setIsValid(false);
      setHelperText(PasswordHelperText.NOT_VALID);
    }
    dispatch(setLoadingState(false));
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCheckPassword();
    }
  };

  return (
    <form className="checkPassword">
      {authLoading && <RoundLoader />}
      <div className="checkPassword__input">
        <Input
          placeholder="Enter your Password"
          value={password}
          type="password"
          autoComplete="password"
          width="220px"
          error={!isValid}
          helperText={helperText}
          onChange={(e) => handleChangePassword(e)}
          onKeyPress={(e) => handleEnter(e)}
        />
      </div>
      <div className="checkPassword__btn">
        <Button size="medium" width="80px" onClick={handleCheckPassword}>
          check
        </Button>
      </div>
    </form>
  );
}

CheckPassword.propTypes = propTypes;

export default CheckPassword;
