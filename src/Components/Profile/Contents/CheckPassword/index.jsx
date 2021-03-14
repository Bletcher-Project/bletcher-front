import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { checkPassword } from 'Redux/auth';

import Input from 'Components/Form/Input';
import Button from 'Components/Form/Button';

function CheckPassword() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);

  const [password, setPassword] = useState();

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckPassword = async () => {
    if (await dispatch(checkPassword(token, password))) {
      console.log(true);
    } else {
      console.log(false);
    }
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCheckPassword();
    }
  };

  return (
    <form className="checkPassword">
      <div className="checkPassword__input">
        <Input
          placeholder="Enter your Password"
          value={password}
          type="password"
          autoComplete="password"
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

export default CheckPassword;
