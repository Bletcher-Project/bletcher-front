import React, { useState } from 'react';

import Input from 'Components/Form/Input';

function CheckPassword() {
  const [password, setPassword] = useState();

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form>
      <Input
        placeholder="Enter your Password"
        value={password}
        type="password"
        autoComplete="password"
        onChange={(e) => handleChangePassword(e)}
      />
    </form>
  );
}

export default CheckPassword;
