import React, { useState } from 'react';

import Input from 'Components/Form/Input';
import Button from 'Components/Form/Button';

function CheckPassword() {
  const [password, setPassword] = useState();

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
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
        />
      </div>
      <div className="checkPassword__btn">
        <Button size="medium" width="80px">
          check
        </Button>
      </div>
    </form>
  );
}

export default CheckPassword;
